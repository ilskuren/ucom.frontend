import Validator from 'validatorjs';

const getInitialState = () => ({
  data: {
    alerts: {
      platform_notifications: false,
      web_push: false,
      email_notifications: false,
      email_newsletter: false,
    },
    account: {
      vote: false,
      share: false,
      comment: false,
      feed_posts: false,
      mentions: false,
      private_messages: false,
      participated_in_polls: false,
    },
    platform_events: {
      follow: false,
      trust: false,
      join: false,
      board_invitations: false,
      upcoming_events: false,
    },
  },
  rules: {
    alerts: {
      platform_notifications: 'boolean',
      web_push: 'boolean',
      email_notifications: 'boolean',
      email_newsletter: 'boolean',
    },
    account: {
      vote: 'boolean',
      share: 'boolean',
      comment: 'boolean',
      feed_posts: 'boolean',
      mentions: 'boolean',
      private_messages: 'boolean',
      participated_in_polls: 'boolean',
    },
    platform_events: {
      follow: 'boolean',
      trust: 'boolean',
      join: 'boolean',
      board_invitations: 'boolean',
      upcoming_events: 'boolean',
    },
  },
  errors: {

  },
  isValid: false,
});

const account = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_SETTINGS_NOTIFICATIONS': {
      return getInitialState();
    }

    case 'SET_SETTINGS_NOTIFICATIONS_DATA': {
      const data = Object.assign({}, state.data, action.payload);
      const validation = new Validator(data, state.rules);

      return Object.assign({}, state, {
        data,
        isValid: validation.passes(),
      });
    }

    case 'VALIDATE_SETTINGS_NOTIFICATIONS': {
      const validation = new Validator(state.data, state.rules);

      validation.passes();

      return Object.assign({}, state, {
        errors: validation.errors.all(),
      });
    }

    case 'VALIDATE_SETTINGS_NOTIFICATIONS_FIELD': {
      const validation = new Validator(state.data, state.rules);

      validation.passes();

      return Object.assign({}, state, {
        errors: Object.assign({}, state.errors, {
          [action.payload]: validation.errors.get(action.payload),
        }),
      });
    }

    default: {
      return state;
    }
  }
};

export default account;
