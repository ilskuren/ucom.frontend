import Validator from 'validatorjs';

const getInitialState = () => ({
  data: {
    title: '',
    currency_to_show: '',
    powered_by: '',
    about: '',
    nickname: '',
    country: '',
    city: '',
    address: '',
    avatar_filename: '',
    email: '',
    phone_number: '',
    personal_website_url: '',
  },
  saved: false,
  errors: {},
  isValid: false,
  activeStepId: 1,
  steps: [{
    id: 1,
    name: 'General info',
    rules: {
      title: 'required',
      currency_to_show: 'required',
      powered_by: 'required',
      about: 'required',
      nickname: 'required',
      country: 'required',
      city: 'required',
      address: 'required',
      avatar_filename: 'required',
    },
  }, {
    id: 2,
    name: 'Contacts',
    rules: {
      email: 'required|email',
      phone_number: 'required',
      personal_website_url: 'required|url',
    },
  }],
});

const organization = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_ORGANIZATION': {
      return getInitialState();
    }

    case 'SET_ORGANIZATION_DATA': {
      const keys = Object.keys(action.payload);
      const data = Object.assign({}, state.data, action.payload);
      const activeStep = state.steps.find(step => step.id === state.activeStepId);
      const validation = new Validator(data, activeStep.rules);
      const isValid = validation.passes();
      const currentErrors = keys.reduce((value, key) => ({ ...value, [key]: validation.errors.get(key) }), {});
      const errors = Object.assign({}, state.errors, currentErrors);

      return Object.assign({}, state, {
        data,
        isValid,
        errors,
      });
    }

    case 'SET_ORGANIZATION_ACTIVE_TAB': {
      return Object.assign({}, state, {
        activeStepId: action.payload,
        isValid: false,
      });
    }

    case 'SET_ORGANIZATION_SAVED': {
      return Object.assign({}, state, { saved: action.payload });
    }

    default: {
      return state;
    }
  }
};

export default organization;
