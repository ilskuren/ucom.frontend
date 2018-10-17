import { uniq, compact } from 'lodash';

export const USER_FEED_TYPE_ID = 1;
export const ORGANIZATION_FEED_TYPE_ID = 2;
export const USER_NEWS_FEED_TYPE_ID = 3;

const getInitialState = () => ({
  [USER_FEED_TYPE_ID]: {},
  [ORGANIZATION_FEED_TYPE_ID]: {},
  [USER_NEWS_FEED_TYPE_ID]: {},
  loading: false,
});

const feeds = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_FEEDS': {
      return getInitialState();
    }

    case 'ADD_FEED_POSTS': {
      return {
        ...state,
        [action.payload.feedTypeId]: {
          ...state[action.payload.feedTypeId],
          [action.payload.userId]: {
            ...state[action.payload.feedTypeId][action.payload.userId],
            postsIds: uniq(compact(state[action.payload.feedTypeId][action.payload.userId] ?
              [].concat(state[action.payload.feedTypeId][action.payload.userId].postsIds, action.payload.postsIds) :
              [].concat(action.payload.postsIds))),
            metadata: action.payload.metadata ?
              action.payload.metadata :
              state[action.payload.feedTypeId][action.payload.userId] && state[action.payload.feedTypeId][action.payload.userId].metadata,
          },
        },
      };
    }

    case 'SET_FEED_LOADING': {
      return {
        ...state,
        loading: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export const getWallFeedIdsByUserId = (feeds, userId) => feeds[USER_FEED_TYPE_ID][userId];
export const getNewsFeedIdsByUserId = (feeds, organizationId) => feeds[USER_NEWS_FEED_TYPE_ID][organizationId];
export const getWallFeedIdsByOrganizationId = (feeds, organizationId) => feeds[ORGANIZATION_FEED_TYPE_ID][organizationId];

export default feeds;
