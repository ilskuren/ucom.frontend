import { uniqueId } from 'lodash';

export const CONGRATULATIONS_EVENT_ID = 10;
export const USER_FOLLOWS_YOU = 30;
export const USER_UPVOTES_YOUR_POST = 31;
export const USER_DOWNVOTES_YOUR_POST = 32;
export const USER_UPVOTES_YOUR_COMMENT = 33;
export const USER_DOWNVOTES_YOUR_COMMENT = 34;
export const USER_FOLLOWS_ORG = 50;
export const USER_UPVOTES_ORG_POST = 51;
export const USER_DOWNVOTES_ORG_POST = 52;
export const USER_UPVOTES_ORG_COMMENT = 53;
export const USER_DOWNVOTES_ORG_COMMENT = 54;
export const USER_CREATES_DIRECT_POST_FOR_YOU = 70;
export const USER_COMMENTS_YOUR_POST = 71;
export const USER_LEAVES_COMMENT_ON_YOUR_COMMENT = 72;
export const USER_CREATES_DIRECT_POST_FOR_ORG = 90;
export const USER_COMMENTS_ORG_POST = 91;
export const USER_LEAVES_COMMENT_ON_ORG_COMMENT = 92;
export const USER_SHARE_YOUR_POST = 73;

const getInitialState = () => ({
  list: {},
  metadata: {},
  tooltipVisibilty: false,
  totalUnreadAmount: 0,
  loading: false,
});

const siteNotifications = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'REQUEST_NOTIFICATIONS_TOOLTIP_DATA': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'RESET_NOTIFICATIONS_TOOLTIP': {
      return getInitialState();
    }

    case 'RESET_NOTIFICATIONS_TOOLTIP_DATA': {
      return {
        ...state,
        list: getInitialState().list,
        metadata: getInitialState().metadata,
      };
    }

    case 'HIDE_NOTIFICATIONS_TOOLTIP': {
      return {
        ...state,
        tooltipVisibilty: false,
      };
    }

    case 'SHOW_NOTIFICATIONS_TOOLTIP': {
      return {
        ...state, tooltipVisibilty: true,
      };
    }

    case 'SET_UNREAD_NOTIFICATIONS_AMOUNT': {
      return {
        ...state, totalUnreadAmount: action.payload,
      };
    }

    case 'ADD_SITE_NOTIFICATIONS': {
      return {
        ...state,
        loading: false,
        list: {
          ...state.list,
          ...action.payload.data.reduce((accumulator, currentValue) => {
            const id = currentValue.id || uniqueId((new Date()).getTime());
            return { ...accumulator, [id]: { ...currentValue, id } };
          }, {}),
        },
        metadata: {
          ...state.metadata,
          ...action.payload.metadata,
        },
      };
    }

    case 'DELETE_SITE_NOTIFICATION': {
      const list = { ...state.list };
      delete list[action.payload.id];

      return {
        ...state,
        list,
      };
    }

    default: {
      return state;
    }
  }
};

export default siteNotifications;
