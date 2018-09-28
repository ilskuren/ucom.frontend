import Validator from 'validatorjs';

export const SOURCES_ID_FACEBOOK = 1;
export const SOURCES_ID_REDDIT = 2;
export const SOURCES_ID_MEDIUM = 3;
export const SOURCES_ID_TWITTER = 4;

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
    entity_sources: [{
      source_type_id: SOURCES_ID_FACEBOOK,
      source_url: '',
    }, {
      source_type_id: SOURCES_ID_REDDIT,
      source_url: '',
    }, {
      source_type_id: SOURCES_ID_MEDIUM,
      source_url: '',
    }, {
      source_type_id: SOURCES_ID_TWITTER,
      source_url: '',
    }],
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
      delete action.payload.entity_sources;

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
      const activeStep = state.steps.find(step => step.id === state.activeStepId);
      const validation = new Validator(state.data, activeStep.rules);
      const isValid = validation.passes();

      return Object.assign({}, state, {
        activeStepId: action.payload,
        isValid,
      });
    }

    case 'SET_ORGANIZATION_SAVED': {
      return Object.assign({}, state, { saved: action.payload });
    }

    case 'SET_ORGANIZATION_ENTITY_SOURCES': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          entity_sources: state.data.entity_sources
            .map(source => Object.assign({}, source, action.payload
              .find(item => source.source_type_id === item.source_type_id))),
        }),
      });
    }

    case 'SET_ORGANIZATION_ENTITY_SOURCE': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          entity_sources: state.data.entity_sources
            .map(source => Object.assign({}, source, source.source_type_id === action.payload.source_type_id ?
              action.payload : {})),
        }),
      });
    }

    default: {
      return state;
    }
  }
};

export default organization;
