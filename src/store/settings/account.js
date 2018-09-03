import Validator from 'validatorjs';

const getInitialState = () => ({
  data: {
    email: '',
    password: '',
    profile_link: '',
    kyc: null,
    time_zone: '',
    language: '',
    currency: '',
  },
  rules: {
    email: 'required|email',
    password: 'required',
    profile_link: 'required',
    kyc: 'required',
    time_zone: 'required|date',
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
      const data = Object.assign({}, state.data, action.data);
      const validation = new Validator(data, state.rules);

      return Object.assign({}, state, {
        data,
        isValid: validation.passes(),
      });
    }

    case 'VALIDATE_SETTINGS_ACCOUNT': {
      const validation = new Validator(state.data, state.rules);

      validation.passes();

      return Object.assign({}, state, {
        errors: validation.errors.all(),
      });
    }

    case 'VALIDATE_SETTINGS_ACCOUNT_FIELD': {
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

export default account;
