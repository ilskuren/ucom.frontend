import loader from '../utils/loader';
import api from '../api';
import { addPosts } from './posts';
import { USER_FEED_TYPE_ID, USER_NEWS_FEED_TYPE_ID, ORGANIZATION_FEED_TYPE_ID } from '../store/feeds';

export const addFeedPosts = payload => ({ type: 'ADD_FEED_POSTS', payload });
export const removeFeedPosts = payload => ({ type: 'REMOVE_FEED_POSTS', payload });
export const setFeedLoading = payload => ({ type: 'SET_FEED_LOADING', payload });

const loaderStart = () => (dispatch) => {
  loader.start();
  dispatch(setFeedLoading(true));
};

const loaderDone = () => (dispatch) => {
  loader.done();
  if (loader.isDone()) {
    dispatch(setFeedLoading(false));
  }
};

export const getUserWallFeed = payload => (dispatch) => {
  dispatch(loaderStart());
  api.getUserWallFeed(payload.userId, payload.perPage, payload.page)
    .then((data) => {
      dispatch(addPosts(data.data));
      dispatch(addFeedPosts({
        feedTypeId: USER_FEED_TYPE_ID,
        userId: payload.userId,
        postsIds: data.data.map(item => item.id),
        metadata: data.metadata,
      }));
    })
    .catch(() => dispatch(loaderDone()))
    .then(() => dispatch(loaderDone()));
};

export const removeWallFeedPosts = payload => (dispatch) => {
  dispatch(removeFeedPosts({
    feedTypeId: USER_FEED_TYPE_ID,
    userId: payload.userId,
  }));
};

export const getOrganizationWallFeed = payload => (dispatch) => {
  dispatch(loaderStart());
  api.getOrganizationWallFeed(payload.organizationId, payload.perPage, payload.page)
    .then((data) => {
      dispatch(addPosts(data.data));
      dispatch(addFeedPosts({
        feedTypeId: ORGANIZATION_FEED_TYPE_ID,
        userId: payload.organizationId,
        postsIds: data.data.map(item => item.id),
        metadata: data.metadata,
      }));
    })
    .catch(() => dispatch(loaderDone()))
    .then(() => dispatch(loaderDone()));
};

export const removeOrganizationWallFeed = payload => (dispatch) => {
  dispatch(removeFeedPosts({
    feedTypeId: ORGANIZATION_FEED_TYPE_ID,
    userId: payload.organizationId,
  }));
};

export const getUserNewsFeed = payload => (dispatch) => {
  dispatch(loaderStart());
  api.getUserNewsFeed(payload.perPage, payload.page)
    .then((data) => {
      dispatch(addPosts(data.data));
      dispatch(addFeedPosts({
        feedTypeId: USER_NEWS_FEED_TYPE_ID,
        userId: payload.userId,
        postsIds: data.data.map(item => item.id),
        metadata: data.metadata,
      }));
    })
    .catch(() => dispatch(loaderDone()))
    .then(() => dispatch(loaderDone()));
};

export const removeUserNewsFeed = payload => (dispatch) => {
  dispatch(removeFeedPosts({
    feedTypeId: USER_NEWS_FEED_TYPE_ID,
    userId: payload.userId,
  }));
};
