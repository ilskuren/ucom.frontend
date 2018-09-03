import Validator from 'validatorjs';

const getInitialState = () => ({
  data: {
    auto_login: false,
    two_fa: false,
  },
  rules: {
    auto_login: 'required|boolean',
    two_fa: 'required|boolean',
  },
  errors: {
  },
  isValid: false,
});

const security = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_SETTINGS_SECURITY': {
      return getInitialState();
    }

    case 'SET_SETTINGS_SECURITY_DATA': {
      const data = Object.assign({}, state.data, action.data);
      const validation = new Validator(data, state.rules);

      return Object.assign({}, state, {
        data,
        isValid: validation.passes(),
      });
    }

    case 'VALIDATE_SETTINGS_SECURITY': {
      const validation = new Validator(state.data, state.rules);

      validation.passes();

      return Object.assign({}, state, {
        errors: validation.errors.all(),
      });
    }

    case 'VALIDATE_SETTINGS_SECURITY_FIELD': {
      const validation = new Validator(state.data, state.rules);

      validation.passes();

      return Object.assign({}, state, {
        errors: Object.assign({}, state.errors, {
          [action.data]: validation.errors.get(action.data),
        }),
      });
    }

    default: {
      return state;
    }
  }
};

export default security;
