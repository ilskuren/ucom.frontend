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

const blacklist = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_SETTINGS_BLACKLIST': {
      return getInitialState();
    }

    case 'SET_SETTINGS_BLACKLIST_DATA': {
      const data = {
        ...state.data,
        ...action.payload,
      };

      const validation = new Validator(data, state.rules);

      return {
        ...state,
        ...data,
        isValid: validation.passes(),
      };
    }

    case 'VALIDATE_SETTINGS_BLACKLIST': {
      const validation = new Validator(state.data, state.rules);

      validation.passes();

      return {
        ...state,
        errors: validation.errors.all(),
      };
    }

    case 'VALIDATE_SETTINGS_BLACKLIST_FIELD': {
      const validation = new Validator(state.data, state.rules);

      validation.passes();

      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload]: validation.errors.get(action.payload),
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default blacklist;
