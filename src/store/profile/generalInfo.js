import Validator from 'validatorjs';

export const getGeneralInfoInitialState = () => ({
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
    firstName: 'string',
    lastName: 'string',
    nickname: 'string',
    birthday: 'string',
    country: 'string',
    city: 'string',
    address: 'string',
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


const generalInfo = (state = getGeneralInfoInitialState(), action) => {
  switch (action.type) {
    case 'PROFILE:CHANGE_INPUT_VALUE': {
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
