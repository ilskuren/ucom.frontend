import { validateFields } from '../utils/validateFields';

const getInitialState = () => ({
  errors: {},
  serverErrors: [],
  form: {
    firstName: '',
    about: '',
    usersSources: [],
    personalWebsiteUrl: '',
  },
  rules: {
  },
});

const userForm = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'USER_FORM__RESET':
      return getInitialState();

    case 'USER_FORM__SET_FORM': {
      const fields = Object.keys(action.payload);
      const form = { ...state.form, ...action.payload };
      const validation = validateFields(form, fields, state.rules);
      const errors = { ...state.errors, ...validation.errors };
      const { isValid } = validation;
      return {
        ...state, form, errors, isValid,
      };
    }

    case 'USER_FORM__SET_DATA':
      return { ...state, ...action.payload };

    default: {
      return state;
    }
  }
};

export default userForm;
