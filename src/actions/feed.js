import api from '../api';
import * as postsUtils from '../utils/posts';
import { addPosts } from './posts';
import graphql from '../api/graphql';
import { USER_NEWS_FEED_ID, USER_WALL_FEED_ID, ORGANIZATION_FEED_ID } from '../utils/feed';
import { COMMENTS_INITIAL_COUNT_USER_WALL_FEED } from '../utils/comments';

export const feedReset = () => ({ type: 'FEED_RESET' });
export const feedSetLoading = payload => ({ type: 'FEED_SET_LOADING', payload });
export const feedSetMetadata = payload => ({ type: 'FEED_SET_METADATA', payload });
export const feedSetPostIds = payload => ({ type: 'FEED_SET_POST_IDS', payload });
export const feedAppendPostIds = payload => ({ type: 'FEED_APPEND_POST_IDS', payload });
export const feedPrependPostIds = payload => ({ type: 'FEED_PREPEND_POST_IDS', payload });

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

    dispatch(addPosts(data.data));
    dispatch(feedAppendPostIds(data.data.map(i => i.id)));
    dispatch(feedSetMetadata(data.metadata));
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

  dispatch(feedSetLoading(true));

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
