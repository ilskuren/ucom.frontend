import Validator from 'validatorjs';

const getInitialState = () => ({
  data: {
    title: null,
    nickname: null,
    avatar_filename: null,
    currency_to_show: null,
    powered_by: null,
    about: null,
    country: null,
    city: null,
    address: null,
    email: null,
    phone_number: null,
    personal_website_url: null,
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
      nickname: 'required',
    },
  }, {
    id: 2,
    name: 'Contacts',
    rules: {
      email: 'email',
      personal_website_url: 'url',
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
        isValid: true, // TODO: Calc valid
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
