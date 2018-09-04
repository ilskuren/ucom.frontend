import Validator from 'validatorjs';

const getInitialState = () => ({
  data: {
    email: '',
    password: '',
    profileLink: '',
    kyc: null,
    timeZone: '',
    language: '',
    currency: '',
  },
  rules: {
    email: 'required|email',
    password: 'required',
    profileLink: 'required',
    kyc: 'required',
    timeZone: 'required|date',
    language: 'required|string',
    currency: 'required',
  },
  errors: {

  },
  isValid: false,
});

const account = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_SETTINGS_ACCOUNT': {
      return getInitialState();
    }

    case 'SET_SETTINGS_ACCOUNT_DATA': {
      const data = {
        ...state.data,
        ...action.payload,
      };

      const validation = new Validator(data, state.rules);

      return {
        ...state,
        data,
        isValid: validation.passes(),
      };
    }

    case 'VALIDATE_SETTINGS_ACCOUNT': {
      const validation = new Validator(state.data, state.rules);

      validation.passes();

      return {
        ...state,
        errors: validation.errors.all(),
      };
    }

    case 'VALIDATE_SETTINGS_ACCOUNT_FIELD': {
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

export default account;
