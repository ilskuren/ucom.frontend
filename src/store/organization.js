import Validator from 'validatorjs';

export const SOURCES_ID_FACEBOOK = 1;
export const SOURCES_ID_REDDIT = 2;
export const SOURCES_ID_MEDIUM = 3;
export const SOURCES_ID_TWITTER = 4;

const getInitialState = () => ({
  data: {
    title: null,
    nickname: null,
    avatarFilename: null,
    currencyToShow: null,
    poweredBy: null,
    about: null,
    country: null,
    city: null,
    address: null,
    email: null,
    phoneNumber: null,
    personalWebsite_url: null,
    entitySources: [{
      sourceTypeId: SOURCES_ID_FACEBOOK,
      sourceUrl: '',
    }, {
      sourceTypeId: SOURCES_ID_REDDIT,
      sourceUrl: '',
    }, {
      sourceTypeId: SOURCES_ID_MEDIUM,
      sourceUrl: '',
    }, {
      sourceTypeId: SOURCES_ID_TWITTER,
      sourceUrl: '',
    }],
  },
  loading: false,
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
      personalWebsiteUrl: 'url',
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
      return { ...state, saved: action.payload };
    }

    case 'SET_ORGANIZATION_LOADING': {
      return { ...state, loading: action.payload };
    }

    case 'SET_ORGANIZATION_ENTITY_SOURCES': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          entitySources: state.data.entitySources
            .map(source => Object.assign({}, source, action.payload
              .find(item => source.sourceTypeId === item.sourceTypeId))),
        }),
      });
    }

    case 'SET_ORGANIZATION_ENTITY_SOURCE': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          entitySources: state.data.entitySources
            .map(source => Object.assign({}, source, source.sourceTypeId === action.payload.sourceTypeId ?
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
