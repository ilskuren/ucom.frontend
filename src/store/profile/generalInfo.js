import Validator from 'validatorjs';

const getInitialState = () => ({
  data: {
    firstName: '',
    lastName: '',
    nickname: '',
    about: '',
    birthday: '',
    country: '',
    city: '',
    address: '',
    currencyToShow: '',
    avatarFilename: '',
  },
  rules: {
    firstName: 'required|string',
    lastName: 'required|string',
    nickname: 'required|string',
    about: 'required|string',
    birthday: 'required|string',
    country: 'required|string',
    city: 'required|string',
    address: 'required|string',
  },
  errors: {
    firstName: null,
    lastName: null,
    nickname: null,
    about: null,
    birthday: null,
    country: null,
    city: null,
    address: null,
  },
  isValid: false,
});


const generalInfo = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'PROFILE_GENERAL-INFO:CHANGE_INPUT_VALUE': {
      const { field, value } = action.payload;

      const data = {
        ...state.data,
        [field]: value,
      };

      const validation = new Validator(data, state.rules);

      return {
        ...state,
        data,
        isValid: validation.passes(),
        errors: {
          ...state.errors,
          [field]: validation.errors.get([field]),
        },
      };
    }

    case 'PROFILE_GENERAL-INFO:VALIDATE_FORM': {
      const validation = new Validator(state.data, state.rules);

      return {
        ...state,
        isValid: validation.passes(),
        errors: {
          ...validation.errors.all(),
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default generalInfo;
