import Validator from 'validatorjs';

const getInitialState = () => ({
  data: {
    autoLogin: false,
    twoFa: false,
  },
  rules: {
    autoLogin: 'required|boolean',
    twoFa: 'required|boolean',
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
      const { item, checkValue } = action.payload;

      const data = Object.assign({}, state.data, action.payload);
      const validation = new Validator(data, state.rules);

      return {
        ...state,
        data: {
          ...state.data,
          [item]: checkValue,
        },
        isValid: validation.passes(),
      };
    }

    default: {
      return state;
    }
  }
};

export default security;
