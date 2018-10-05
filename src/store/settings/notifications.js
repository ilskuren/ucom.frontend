import Validator from 'validatorjs';
import { SETTINGS } from '../../utils/actionTypes';

const getInitialState = () => ({
  data: {
    alerts: {
      platformNotifications: true,
      webPush: false,
      emailNotifications: false,
      emailNewsletter: false,
    },
    account: {
      vote: false,
      share: false,
      comment: false,
      feedPosts: false,
      mentions: false,
      privateMessages: false,
      participatedInPolls: false,
    },
    events: {
      follow: false,
      trust: false,
      join: false,
      boardInvitations: false,
      upcomingEvents: false,
    },
  },
  rules: {
    alerts: {
      platformNotifications: 'boolean',
      webPush: 'boolean',
      emailNotifications: 'boolean',
      emailNewsletter: 'boolean',
    },
    account: {
      vote: 'boolean',
      share: 'boolean',
      comment: 'boolean',
      feedPosts: 'boolean',
      mentions: 'boolean',
      privateMessages: 'boolean',
      participatedInPolls: 'boolean',
    },
    events: {
      follow: 'boolean',
      trust: 'boolean',
      join: 'boolean',
      boardInvitations: 'boolean',
      upcomingEvents: 'boolean',
    },
  },
  errors: {},
  isValid: false,
});

const account = (state = getInitialState(), action) => {
  switch (action.type) {
    case SETTINGS.RESET_NOTIFICATIONS: {
      return getInitialState();
    }

    case SETTINGS.SET_NOTIFICATIONS_DATA: {
      const { type, item, checkValue } = action.payload;

      const data = Object.assign({}, state.data, action.payload);
      const validation = new Validator(data, state.rules);

      return {
        ...state,
        data: {
          ...state.data,
          [type]: {
            ...state.data.alerts,
            [item]: checkValue,
          },
        },
        isValid: validation.passes(),
      };
    }

    default: {
      return state;
    }
  }
};

export default account;
