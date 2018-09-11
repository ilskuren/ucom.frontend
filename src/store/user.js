import Validator from 'validatorjs';
import * as rules from './../utils/validators/';
import { validateArrayUrls } from './../utils/validators/custom';
import { validatorRules } from './../utils/constants';

rules.registerPhoneNumber.rule(Validator, /^[\d -]*$/);

const getInitialState = () => ({
  errors: {
    personalWebsitesUrls: {
      isValid: false,
      results: [],
    },
  },
  isValid: false,
});

const user = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, action.payload);
    case 'REMOVE_USER':
      return getInitialState();

    case 'CHANGE_USER_FIELD': {
      const { field, value, validationRules } = action.payload;
      const data = {
        ...state.data,
        [field]: value,
      };

      const validation = new Validator(data, validatorRules.user[validationRules]);

      return {
        ...state,
        ...data,
        isValid: validation.passes(),
        errors: {
          ...state.errors,
          [field]: validation.errors.get([field]),
        },
      };
    }

    case 'ADD_USER_PERSONAL_SITE': {
      const { personalWebsitesUrls } = state;
      if (!Array.isArray(personalWebsitesUrls)) {
        return {
          ...state,
          personalWebsitesUrls: [personalWebsitesUrls].concat(''),
        };
      }
      return {
        ...state,
        personalWebsitesUrls: state.personalWebsitesUrls.concat(''),
      };
    }

    case 'REMOVE_USER_PERSONAL_SITE': {
      const index = action.payload;

      const returnWebSitesUrls = () => {
        const possibleNewWebSitesUrls = [
          ...state.personalWebsitesUrls.slice(0, index),
          ...state.personalWebsitesUrls.slice(index + 1),
        ];

        if (possibleNewWebSitesUrls.length !== 0) {
          return possibleNewWebSitesUrls;
        }
        return [
          ...state.personalWebsitesUrls.slice(0, index),
          ...state.personalWebsitesUrls.slice(index + 1),
        ].concat('');
      };

      return {
        ...state,
        personalWebsitesUrls: returnWebSitesUrls(),
        errors: {
          ...state.errors,
          personalWebsitesUrls: {
            ...state.errors.personalWebsitesUrls,
            results: [
              ...state.errors.personalWebsitesUrls.results.slice(0, -1),
            ],
          },
        },
      };
    }

    case 'CHANGE_USER_PERSONAL_SITE': {
      const { index, value } = action.payload;
      const { personalWebsitesUrls } = state;
      const returnWebSitesUrls = () => {
        if (!Array.isArray(personalWebsitesUrls)) {
          return [value];
        }
        if (index > personalWebsitesUrls.length) {
          return [...personalWebsitesUrls, value];
        }
        return personalWebsitesUrls.map((webSiteUrl, webSiteIndex) => (webSiteIndex === index ? value : webSiteUrl));
      };

      const data = {
        personalWebsitesUrls: returnWebSitesUrls(),
      };

      return {
        ...state,
        ...data,
        errors: {
          ...state.errors,
          personalWebsitesUrls: validateArrayUrls(data.personalWebsitesUrls),
        },
      };
    }

    case 'ADD_USER_EDUCATION_ITEM': {
      const returnUserEducations = () => {
        if (Array.isArray(state.userEducations)) {
          return state.userEducations.concat({
            endDate: null,
            startDate: null,
            isCurrent: false,
            degree: '',
            speciality: '',
            title: '',
          });
        }
        return [];
      };
      return {
        ...state,
        userEducations: returnUserEducations(),
      };
    }

    case 'CHANGE_USER_EDUCATION_ITEM': {
      const { index } = action.payload;
      const { userEducations } = state;
      const fieldKey = Object.keys(action.payload).filter(key => key !== 'index')[0];
      const fieldValue = action.payload[fieldKey];
      const value = {
        [fieldKey]: fieldValue,
      };
      const returnUserEducations = () => {
        if (index > userEducations.length) {
          return [...userEducations, value];
        }
        return userEducations.map((userEducation, userEducationIndex) => {
          if (userEducationIndex === index) {
            return {
              ...userEducation,
              ...value,
            };
          }
          return userEducation;
        });
      };

      return {
        ...state,
        userEducations: returnUserEducations(),
      };
    }

    case 'REMOVE_USER_EDUCATION_ITEM': {
      const index = action.payload;

      const returnUserEducations = () => {
        const possibleNewUserEducations = [
          ...state.userEducations.slice(0, index),
          ...state.userEducations.slice(index + 1),
        ];

        if (possibleNewUserEducations.length !== 0) {
          return possibleNewUserEducations;
        }
        return [
          ...state.userEducations.slice(0, index),
          ...state.userEducations.slice(index + 1),
        ].concat({
          endDate: null,
          startDate: null,
          isCurrent: false,
          degree: '',
          speciality: '',
          title: '',
        });
      };

      return {
        ...state,
        userEducations: returnUserEducations(),
      };
    }

    case 'ADD_USER_JOB_ITEM': {
      const returnUserJobs = () => {
        if (Array.isArray(state.userJobs)) {
          return state.userJobs.concat({
            endDate: null,
            startDate: null,
            isCurrent: false,
            title: '',
            position: '',
          });
        }
        return [];
      };
      return {
        ...state,
        userJobs: returnUserJobs(),
      };
    }

    case 'CHANGE_USER_JOB_ITEM': {
      const { index } = action.payload;
      const fieldKey = Object.keys(action.payload).filter(key => key !== 'index')[0];
      const fieldValue = action.payload[fieldKey];
      const value = {
        [fieldKey]: fieldValue,
      };
      const { userJobs } = state;

      const returnUserJobs = () => {
        if (index > userJobs.length) {
          return [...userJobs, value];
        }
        return userJobs.map((userJob, userJobIndex) => {
          if (userJobIndex === index) {
            return {
              ...userJob,
              ...value,
            };
          }
          return userJob;
        });
      };
      return {
        ...state,
        userJobs: returnUserJobs(),
      };
    }

    case 'ADD_USER_REMOVE_ITEM': {
      const index = action.payload;

      const returnUserJobs = () => {
        const possibleNewUserJobs = [
          ...state.userJobs.slice(0, index),
          ...state.userJobs.slice(index + 1),
        ];

        if (possibleNewUserJobs.length !== 0) {
          return possibleNewUserJobs;
        }
        return [
          ...state.userJobs.slice(0, index),
          ...state.userJobs.slice(index + 1),
        ].concat({
          endDate: null,
          startDate: null,
          isCurrent: false,
          title: '',
          position: '',
        });
      };

      return {
        ...state,
        userJobs: returnUserJobs(),
      };
    }

    case 'VALIDATE_PROFILE_FORM': {
      const validation = new Validator(state, validatorRules.user[action.payload]);
      const passes = validation.passes();
      const shouldValidateWebsitesUrls = action.payload !== 'contactsRules';
      if (shouldValidateWebsitesUrls) {
        const validUrls = state.errors.personalWebsitesUrls && state.errors.personalWebsitesUrls.isValid;
        return {
          ...state,
          isValid: passes && validUrls,
          errors: {
            ...validation.errors.all(),
            personalWebsitesUrls: state.errors.personalWebsitesUrls,
          },
        };
      };
      return {
        ...state,
        isValid: passes,
        errors: {
          ...validation.errors.all(),
          personalWebsitesUrls: state.errors.personalWebsitesUrls,
        },
      };
    }

    case 'CLEAR_PROFILE_FORM_ERRORS': {
      return {
        ...state,
        errors: {
        },
      };
    }

    default:
      return state;
  }
};

export default user;
