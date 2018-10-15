import { uniqueId } from 'lodash';

const getInitialState = () => ({
  tooltipNotificationsList: {
    1: {
      username: 'Suzan Born',
      time: 'today at 9:11 am',
      avatar: 'https://steamuserimages-a.akamaihd.net/ugc/933814008881052459/22818793B6D9C730A788E677F998933F9EDDE0B7/',
      description: 'started following you',
      recent: true,
      id: 1,
      typeOfFeedIcon: 'upvote',
    },
    2: {
      username: 'Shiro',
      time: 'today at 3:21 pm',
      avatar: 'http://profilepicturesdp.com/wp-content/uploads/2018/07/matching-profile-pictures-sun-night-4-1.jpg',
      description: 'started following your organization Taboon Common',
      recent: true,
      postCover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Parking_icon.svg/600px-Parking_icon.svg.png',
      id: 2,
      typeOfFeedIcon: 'downvote',
    },
  },
  tooltipVisibilty: false,
  totalUnreadAmount: 0,
});

const siteNotifications = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_NOTIFICATIONS_TOOLTIP': {
      return getInitialState();
    }

    case 'HIDE_NOTIFICATIONS_TOOLTIP': {
      return {
        ...state, tooltipVisibilty: false,
      };
    }
    case 'SET_UNREAD_NOTIFICATIONS_AMOUNT': {
      return {
        ...state, tooltipVisibilty: action.payload,
      };
    }
    case 'SHOW_NOTIFICATIONS_TOOLTIP': {
      return {
        ...state, tooltipVisibilty: true,
      };
    }

    case 'TRIGGER_NOTIFICATIONS_TOOLTIP': {
      return {
        ...state, tooltipVisibilty: !state.tooltipVisibilty,
      };
    }

    case 'ADD_SITE_NOTIFICATIONS': {
      return {
        ...state,
        tooltipNotificationsList: {
          ...state.tooltipNotificationsList,
          ...action.payload.data.reduce((accumulator, currentValue) => {
            const id = currentValue.id || uniqueId((new Date()).getTime());
            return { ...accumulator, [id]: { ...currentValue, id } };
          }, {}),
        },
      };
    }

    case 'EDIT_SITE_NOTIFICATION': {
      return {
        ...state,
        tooltipNotificationsList: {
          ...state.tooltipNotificationsList,
          [action.payload.id]: {
            ...state.tooltipNotificationsList[action.payload.id], ...action.payload.data,
          },
        },
      };
    }

    case 'DELETE_SITE_NOTIFICATION': {
      const tooltipNotificationsList = { ...state.tooltipNotificationsList };
      delete tooltipNotificationsList[action.payload.id];

      return {
        ...state,
        tooltipNotificationsList,
      };
    }

    default: {
      return state;
    }
  }
};

export default siteNotifications;
