import {
  USER_NEWS_FEED_ID,
  USER_WALL_FEED_ID,
  ORGANIZATION_FEED_ID,
  TAG_FEED_ID,
} from '../utils/feed';
import { COMMENTS_INITIAL_COUNT_USER_WALL_FEED, COMMENTS_CONTAINER_ID_FEED_POST } from '../utils/comments';
import api from '../api';
import * as overviewUtils from '../utils/overview';

import graphql from '../api/graphql';
import { addPosts } from './posts';
import { commentsAddContainerData } from './comments';

export const feedReset = () => ({ type: 'FEED_RESET' });
export const feedSetLoading = payload => ({ type: 'FEED_SET_LOADING', payload });
export const feedSetMetadata = payload => ({ type: 'FEED_SET_METADATA', payload });
export const feedSetPostIds = payload => ({ type: 'FEED_SET_POST_IDS', payload });
export const feedPrependPostIds = payload => ({ type: 'FEED_PREPEND_POST_IDS', payload });
export const feedAppendPostIds = payload => ({ type: 'FEED_APPEND_POST_IDS', payload });

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
  tagIdentity,
}) => async (dispatch) => {
  const getFeedFunctions = {
    [USER_NEWS_FEED_ID]: graphql.getUserNewsFeed,
    [USER_WALL_FEED_ID]: graphql.getUserWallFeed,
    [ORGANIZATION_FEED_ID]: graphql.getOrganizationWallFeed,
    [TAG_FEED_ID]: graphql.getTagWallFeed,
  };

  dispatch(feedSetLoading(true));

  try {
    const data = await getFeedFunctions[feedTypeId]({
      page,
      perPage,
      userId,
      organizationId,
      tagIdentity,
      commentsPerPage: COMMENTS_INITIAL_COUNT_USER_WALL_FEED,
    });
    dispatch(parseFeedData({
      posts: data.data,
      metadata: data.metadata,
    }));
  } catch (e) {
    console.error(e);
  }

  setTimeout(() => {
    dispatch(feedSetLoading(false));
  }, 2000);
};

export const feedCreatePost = (feedTypeId, params) => (dispatch) => {
  const createCommentPostFunctions = {
    [USER_NEWS_FEED_ID]: api.createUserCommentPost.bind(api),
    [USER_WALL_FEED_ID]: api.createUserCommentPost.bind(api),
    [ORGANIZATION_FEED_ID]: api.createOrganizationsCommentPost.bind(api),
    [TAG_FEED_ID]: api.createUserCommentPost.bind(api),
  };

  dispatch(feedSetLoading(true));

  return createCommentPostFunctions[feedTypeId](params)
    .then((data) => {
      dispatch(addPosts([data]));
      dispatch(feedPrependPostIds([data.id]));
      dispatch(feedSetLoading(false));
    })
    .catch(() => {
      dispatch(feedSetLoading(false));
    });
};

export const feedGetPosts = (
  postsCategoryId,
  {
    page,
    perPage,
    postTypeId,
  },
) => async (dispatch) => {
  const postFilteringForCategories = {
    [overviewUtils.OVERVIEW_CATEGORIES_HOT_ID]: {
      createdAt: '24_hours',
    },
  };

  const postOrderingForCategories = {
    [overviewUtils.OVERVIEW_CATEGORIES_HOT_ID]: '-current_rate',
    [overviewUtils.OVERVIEW_CATEGORIES_TRENDING_ID]: '-current_rate_delta_daily',
    [overviewUtils.OVERVIEW_CATEGORIES_FRESH_ID]: '-id',
    [overviewUtils.OVERVIEW_CATEGORIES_TOP_ID]: '-current_rate',
  };

  const params = {
    postFiltering: {
      postTypeId,
      ...postFilteringForCategories[postsCategoryId],
    },
    postOrdering: postOrderingForCategories[postsCategoryId],
    page,
    perPage,
    commentsPerPage: COMMENTS_INITIAL_COUNT_USER_WALL_FEED,
  };

  dispatch(feedSetLoading(true));

  try {
    const data = await graphql.getPosts(params);
    dispatch(parseFeedData({
      posts: data.data,
      metadata: data.metadata,
    }));
  } catch (e) {
    console.error(e);
  }

  dispatch(feedSetLoading(false));
};
