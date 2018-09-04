import Validator from 'validatorjs';

const getInitialState = () => ({
  data: {
  },
  rules: {
  },
  errors: {
  },
  isValid: false,
});

const referral = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_SETTINGS_REFERRAL': {
      return getInitialState();
    }

    case 'SET_SETTINGS_REFERRAL_DATA': {
      const data = Object.assign({}, state.data, action.payload);
      const validation = new Validator(data, state.rules);

      return Object.assign({}, state, {
        data,
        isValid: validation.passes(),
      });
    }

    case 'VALIDATE_SETTINGS_REFERRAL': {
      const validation = new Validator(state.data, state.rules);

      validation.passes();

      return Object.assign({}, state, {
        errors: validation.errors.all(),
      });
    }

    case 'VALIDATE_SETTINGS_REFERRAL_FIELD': {
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

export default referral;
