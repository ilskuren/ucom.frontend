import loader from '../utils/loader';
import api from '../api';
import { addPosts } from './posts';
import { USER_FEED_TYPE_ID, USER_NEWS_FEED_TYPE_ID, ORGANIZATION_FEED_TYPE_ID } from '../store/feeds';
import { isDeepStrictEqual } from 'util';

export const resetFeeds = payload => ({ type: 'RESET_FEEDS', payload });
export const addFeedPosts = payload => ({ type: 'ADD_FEED_POSTS', payload });
export const setFeedLoading = payload => ({ type: 'SET_FEED_LOADING', payload });

const loaderStart = () => (dispatch) => {
  loader.start();
  dispatch(setFeedLoading(true));
};

const loaderDone = () => (dispatch) => {
  loader.done();
  dispatch(setFeedLoading(false));
};

export const getUserWallFeed = payload => (dispatch) => {
  dispatch(loaderStart());
  api.getUserWallFeed(payload.userId, payload.perPage, payload.page)
    .then((data) => {
      data.data.forEach((item) => {
        dispatch(addPosts([item]));
        if (item.post) {
          dispatch(addPosts([item.post]));
        }
      });
      dispatch(addPosts(data.data));
      dispatch(addFeedPosts({
        id: payload.userId,
        feedTypeId: USER_FEED_TYPE_ID,
        postsIds: data.data.map(item => item.id),
        metadata: data.metadata,
      }));
    })
    .catch(() => dispatch(loaderDone()))
    .then(() => dispatch(loaderDone()));
};

export const getOrganizationWallFeed = payload => (dispatch) => {
  dispatch(loaderStart());
  api.getOrganizationWallFeed(payload.organizationId, payload.perPage, payload.page)
    .then((data) => {
      dispatch(addPosts(data.data));
      dispatch(addFeedPosts({
        id: payload.organizationId,
        feedTypeId: ORGANIZATION_FEED_TYPE_ID,
        postsIds: data.data.map(item => item.id),
        metadata: data.metadata,
      }));
    })
    .catch(() => dispatch(loaderDone()))
    .then(() => dispatch(loaderDone()));
};

export const getUserNewsFeed = payload => (dispatch) => {
  dispatch(loaderStart());
  api.getUserNewsFeed(payload.perPage, payload.page)
    .then((data) => {
      data.data.forEach((item) => {
        dispatch(addPosts([item]));
        if (item.post) {
          dispatch(addPosts([item.post]));
        }
      });
      dispatch(addFeedPosts({
        id: payload.userId,
        feedTypeId: USER_NEWS_FEED_TYPE_ID,
        postsIds: data.data.map(item => item.id),
        metadata: data.metadata,
      }));
    })
    .catch(() => dispatch(loaderDone()))
    .then(() => dispatch(loaderDone()));
};
