import {
  POSTS_CATREGORIES_HOT_ID,
  POSTS_CATREGORIES_TRENDING_ID,
  POSTS_CATREGORIES_FRESH_ID,
  POSTS_CATREGORIES_TOP_ID,
  POST_TYPE_MEDIA_ID,
} from '../utils/posts';

import {
  USER_NEWS_FEED_ID,
  USER_WALL_FEED_ID,
  ORGANIZATION_FEED_ID,
} from '../utils/feed';

import { COMMENTS_INITIAL_COUNT_USER_WALL_FEED } from '../utils/comments';

import api from '../api';
import graphql from '../api/graphql';
import loader from '../utils/loader';
import { addPosts } from './posts';
import { addComments } from './comments';

export const feedReset = () => ({ type: 'FEED_RESET' });
export const feedSetLoading = payload => ({ type: 'FEED_SET_LOADING', payload });
export const feedSetMetadata = payload => ({ type: 'FEED_SET_METADATA', payload });
export const feedSetPostIds = payload => ({ type: 'FEED_SET_POST_IDS', payload });
export const feedAppendPostIds = payload => ({ type: 'FEED_APPEND_POST_IDS', payload });
export const feedPrependPostIds = payload => ({ type: 'FEED_PREPEND_POST_IDS', payload });

export const feedAddComments = ({
  postId,
  parentId,
  comments,
  metadata,
}) => (dispatch) => {
  dispatch(addComments(comments));
  dispatch({
    type: 'FEED_ADD_COMMENTS',
    payload: {
      postId,
      parentId,
      metadata,
      commentIds: comments.map(i => i.id),
    },
  });
};

export const feedGetPostComments = ({
  postId,
  page,
  perPage,
}) => async (dispatch) => {
  loader.start();

  try {
    const data = await graphql.getFeedComments({
      page,
      perPage,
      commentableId: postId,
    });

    dispatch(feedAddComments({
      postId,
      parentId: 0,
      comments: data.data,
      metadata: data.metadata,
    }));
  } catch (e) {
    console.error(e);
  }

  loader.done();
};

export const feedGetCommentsOnComment = ({
  postId,
  parentId,
  parentDepth,
  page,
  perPage,
}) => async (dispatch) => {
  loader.start();

  try {
    const data = await graphql.getCommentsOnComment({
      commentableId: postId,
      parentId,
      parentDepth,
      page,
      perPage,
    });

    dispatch(feedAddComments({
      postId,
      parentId,
      metadata: data.metadata,
      comments: data.data,
    }));
  } catch (e) {
    console.error(e);
  }

  loader.done();
};

export const feedCreateComment = ({
  data,
  postId,
  commentId,
}) => async (dispatch) => {
  loader.start();

  try {
    const commentData = await api.createComment(data, postId, commentId);

    dispatch(feedAddComments({
      postId,
      comments: [commentData],
    }));
  } catch (e) {
    console.error(e);
  }

  loader.done();
};

export const parseFeedData = ({
  posts,
  metadata,
}) => (dispatch) => {
  posts.forEach((post) => {
    if (post.comments) {
      dispatch(feedAddComments({
        parentId: 0,
        postId: post.id,
        comments: post.comments.data,
        metadata: post.comments.metadata,
      }));

      delete post.comments;
    }
  });

  dispatch(addPosts(posts));
  dispatch(feedAppendPostIds(posts.map(i => i.id)));
  dispatch(feedSetMetadata(metadata));
};

export const feedGetUserPosts = ({
  page,
  perPage,
  feedTypeId,
  userId,
  organizationId,
}) => async (dispatch) => {
  const getFeedFunctions = {
    [USER_NEWS_FEED_ID]: api.getUserNewsFeed.bind(api),
    [USER_WALL_FEED_ID]: graphql.getUserWallFeed,
    [ORGANIZATION_FEED_ID]: api.getOrganizationWallFeed.bind(api),
  };

  const commentsParams = {
    [USER_WALL_FEED_ID]: {
      commentsPerPage: COMMENTS_INITIAL_COUNT_USER_WALL_FEED,
    },
  };

  dispatch(feedSetLoading(true));

  try {
    const data = await getFeedFunctions[feedTypeId]({
      page,
      perPage,
      userId,
      organizationId,
      ...commentsParams[feedTypeId],
    });

    dispatch(parseFeedData({
      posts: data.data,
      metadata: data.metadata,
    }));
  } catch (e) {
    console.error(e);
  }

  dispatch(feedSetLoading(false));
};

export const feedCreatePost = (feedTypeId, params) => (dispatch, getState) => {
  const createCommentPostFunctions = {
    [USER_NEWS_FEED_ID]: api.createUserCommentPost.bind(api),
    [USER_WALL_FEED_ID]: api.createUserCommentPost.bind(api),
    [ORGANIZATION_FEED_ID]: api.createOrganizationsCommentPost.bind(api),
  };

  dispatch(feedSetLoading(true));

  return createCommentPostFunctions[feedTypeId](params)
    .then((data) => {
      const state = getState();
      const { postIds } = state.feed;

      dispatch(addPosts([data]));
      dispatch(feedSetPostIds([data.id].concat(postIds)));
      dispatch(feedSetLoading(false));
    })
    .catch(() => {
      dispatch(feedSetLoading(false));
    });
};

export const feedGetPosts = (postsCategoryId, params) => (dispatch, getState) => {
  const paramsForCategories = {
    [POSTS_CATREGORIES_HOT_ID]: {
      sortBy: '-current_rate',
      createdAt: '24_hours',
    },
    [POSTS_CATREGORIES_TRENDING_ID]: {
      sortBy: '-current_rate_delta_daily',
    },
    [POSTS_CATREGORIES_FRESH_ID]: {
      sortBy: '-id',
    },
    [POSTS_CATREGORIES_TOP_ID]: {
      sortBy: '-current_rate',
    },
  };

  dispatch(feedSetLoading(true));

  return api.getPosts({
    ...params,
    ...paramsForCategories[postsCategoryId],
    postTypeId: POST_TYPE_MEDIA_ID,
  })
    .then((data) => {
      const state = getState();
      const { postIds } = state.feed;

      dispatch(addPosts(data.data));
      dispatch(feedSetPostIds(postIds.concat(data.data.map(i => i.id))));
      dispatch(feedSetMetadata(data.metadata));
      dispatch(feedSetLoading(false));
    })
    .catch(() => {
      dispatch(feedSetLoading(false));
    });
};
