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
import { COMMENTS_INITIAL_COUNT_USER_WALL_FEED, COMMENTS_CONTAINER_ID_FEED_POST } from '../utils/comments';
import api from '../api';
import graphql from '../api/graphql';
import { addPosts } from './posts';
import { commentsAddContainerData } from './comments';

export const feedReset = () => ({ type: 'FEED_RESET' });
export const feedSetLoading = payload => ({ type: 'FEED_SET_LOADING', payload });
export const feedSetMetadata = payload => ({ type: 'FEED_SET_METADATA', payload });
export const feedSetPostIds = payload => ({ type: 'FEED_SET_POST_IDS', payload });
export const feedAppendPostIds = payload => ({ type: 'FEED_APPEND_POST_IDS', payload });
export const feedPrependPostIds = payload => ({ type: 'FEED_PREPEND_POST_IDS', payload });

export const parseFeedData = ({
  posts,
  metadata,
}) => (dispatch) => {
  posts.forEach((post) => {
    if (post.comments) {
      dispatch(commentsAddContainerData({
        containerId: COMMENTS_CONTAINER_ID_FEED_POST,
        entryId: post.id,
        parentId: 0,
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
    [USER_NEWS_FEED_ID]: graphql.getUserNewsFeed,
    [USER_WALL_FEED_ID]: graphql.getUserWallFeed,
    [ORGANIZATION_FEED_ID]: graphql.getOrganizationWallFeed,
  };

  dispatch(feedSetLoading(true));

  try {
    const data = await getFeedFunctions[feedTypeId]({
      page,
      perPage,
      userId,
      organizationId,
      commentsPerPage: COMMENTS_INITIAL_COUNT_USER_WALL_FEED,
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
