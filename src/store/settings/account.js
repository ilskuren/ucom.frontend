import Validator from 'validatorjs';
import { SETTINGS } from '../../utils/actionTypes';

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
    case SETTINGS.RESET_ACCOUNT: {
      return getInitialState();
    }

    case SETTINGS.SET_ACCOUNT_DATA: {
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

    case SETTINGS.VALIDATE_ACCOUNT_FIELD: {
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
