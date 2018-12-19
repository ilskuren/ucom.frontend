import api from '../api';
import * as feedUtils from '../utils/feed';
import * as postsUtils from '../utils/posts';

import { addPosts } from './posts';

export const feedReset = () => ({ type: 'FEED_RESET' });
export const feedSetLoading = payload => ({ type: 'FEED_SET_LOADING', payload });
export const feedSetMetadata = payload => ({ type: 'FEED_SET_METADATA', payload });
export const feedSetPostIds = payload => ({ type: 'FEED_SET_POST_IDS', payload });

export const feedGetUserPosts = (feedTypeId, params) => (dispatch, getState) => {
  const getFeedFunctions = {
    [feedUtils.USER_NEWS_FEED_ID]: api.getUserNewsFeed.bind(api),
    [feedUtils.USER_WALL_FEED_ID]: api.getUserWallFeed.bind(api),
    [feedUtils.ORGANIZATION_FEED_ID]: api.getOrganizationWallFeed.bind(api),
  };

  feedSetLoading(true);

  return getFeedFunctions[feedTypeId](params)
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

export const feedCreatePost = (feedTypeId, params) => (dispatch, getState) => {
  const createCommentPostFunctions = {
    [feedUtils.USER_NEWS_FEED_ID]: api.createUserCommentPost.bind(api),
    [feedUtils.USER_WALL_FEED_ID]: api.createUserCommentPost.bind(api),
    [feedUtils.ORGANIZATION_FEED_ID]: api.createOrganizationsCommentPost.bind(api),
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
    [postsUtils.POSTS_CATREGORIES_HOT_ID]: {
      sortBy: '-current_rate',
      createdAt: '24_hours',
    },
    [postsUtils.POSTS_CATREGORIES_TRENDING_ID]: {
      sortBy: '-current_rate_delta_daily',
    },
    [postsUtils.POSTS_CATREGORIES_FRESH_ID]: {
      sortBy: '-id',
    },
    [postsUtils.POSTS_CATREGORIES_TOP_ID]: {
      sortBy: '-current_rate',
    },
  };

  feedSetLoading(true);

  return api.getPosts({
    ...params,
    ...paramsForCategories[postsCategoryId],
    postTypeId: postsUtils.POST_TYPE_MEDIA_ID,
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
