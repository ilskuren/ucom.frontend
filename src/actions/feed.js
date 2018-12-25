import store from '../store';
import api from '../api';
import * as feedUtils from '../utils/feed';
import * as postsUtils from '../utils/posts';

import { addPosts } from './posts';

export const feedReset = () =>
  store.dispatch({ type: 'FEED_RESET' });

export const feedSetLoading = loading =>
  store.dispatch({ type: 'FEED_SET_LOADING', payload: loading });

export const feedSetMetadata = metadata =>
  store.dispatch({ type: 'FEED_SET_METADATA', payload: metadata });

export const feedSetPostIds = postIds =>
  store.dispatch({ type: 'FEED_SET_POST_IDS', payload: postIds });

export const feedGetUserPosts = (feedTypeId, params) => {
  const getFeedFunctions = {
    [feedUtils.USER_NEWS_FEED_ID]: api.getUserNewsFeed.bind(api),
    [feedUtils.USER_WALL_FEED_ID]: api.getUserWallFeed.bind(api),
    [feedUtils.ORGANIZATION_FEED_ID]: api.getOrganizationWallFeed.bind(api),
  };

  feedSetLoading(true);

  return getFeedFunctions[feedTypeId](params)
    .then((data) => {
      const state = store.getState();
      const { postIds } = state.feed;

      addPosts(data.data);
      feedSetPostIds(postIds.concat(data.data.map(i => i.id)));
      feedSetMetadata(data.metadata);
      feedSetLoading(false);
    })
    .catch(() => {
      feedSetLoading(false);
    });
};

export const feedCreatePost = (feedTypeId, params) => {
  const createCommentPostFunctions = {
    [feedUtils.USER_NEWS_FEED_ID]: api.createUserCommentPost.bind(api),
    [feedUtils.USER_WALL_FEED_ID]: api.createUserCommentPost.bind(api),
    [feedUtils.ORGANIZATION_FEED_ID]: api.createOrganizationsCommentPost.bind(api),
  };

  feedSetLoading(true);

  return createCommentPostFunctions[feedTypeId](params)
    .then((data) => {
      const state = store.getState();
      const { postIds } = state.feed;

      addPosts([data]);
      feedSetPostIds([data.id].concat(postIds));
      feedSetLoading(false);
    })
    .catch(() => {
      feedSetLoading(false);
    });
};

export const feedGetPosts = (postsCategoryId, params) => {
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
      const state = store.getState();
      const { postIds } = state.feed;

      addPosts(data.data);
      feedSetPostIds(postIds.concat(data.data.map(i => i.id)));
      feedSetMetadata(data.metadata);
      feedSetLoading(false);
    })
    .catch(() => {
      feedSetLoading(false);
    });
};
