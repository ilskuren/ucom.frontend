import Validator from 'validatorjs';
import * as rules from '../../utils/validators/';
import { validateArrayUrls } from '../../utils/validators/custom';

rules.registerPhoneNumber.rule(Validator, /^[\d -]*$/);

export const getContactsInitialState = () => ({
  data: {
    email: '',
    phoneNumber: '',
    websiteUrls: [''],
  },
  rules: {
    email: 'email',
    phoneNumber: `${rules.registerPhoneNumber.name}`,
  },
  errors: {
    email: null,
    phoneNumber: null,
    websiteUrls: {
      isErrorExists: false,
      results: [],
    },
  },
  isValid: false,
});

const contacts = (state = getContactsInitialState(), action) => {
  switch (action.type) {
    case 'PROFILE_CONTACTS:CHANGE_EMAIL_VALUE': {
      const value = action.payload;

      const data = {
        ...state.data,
        email: value,
      };

      const validation = new Validator(data, state.rules);

      return {
        ...state,
        data,
        isValid: validation.passes(),
        errors: {
          ...state.errors,
          email: validation.errors.get('email'),
        },
      };
    }

    case 'PROFILE_CONTACTS:CHANGE_PHONE_VALUE': {
      const value = action.payload;

      const data = {
        ...state.data,
        phoneNumber: value,
      };

      const validation = new Validator(data, state.rules);

      return {
        ...state,
        data,
        isValid: validation.passes(),
        errors: {
          ...state.errors,
          phoneNumber: validation.errors.get('phoneNumber'),
        },
      };
    }


    case 'PROFILE_CONTACTS:VALIDATE_FORM': {
      const validation = new Validator(state.data, state.rules);

      return {
        ...state,
        isValid: validation.passes(),
        errors: {
          ...validation.errors.all(),
          websiteUrls: state.errors.websiteUrls,
        },
      };
    }

    case 'PROFILE_CONTACTS:CHANGE_SITE_VALUE': {
      const { index, value } = action.payload;
      const { websiteUrls } = state.data;

      const returnWebSiteUrls = () => {
        if (index > websiteUrls.length) {
          return [...websiteUrls, value];
        }
        return websiteUrls.map((webSiteUrl, webSiteIndex) => (webSiteIndex === index ? value : webSiteUrl));
      };

      const data = {
        ...state.data,
        websiteUrls: returnWebSiteUrls(),
      };

      const validation = new Validator(data, state.rules);

      return {
        ...state,
        data,
        isValid: validation.passes(),
        errors: {
          ...state.errors,
          websiteUrls: validateArrayUrls(data.websiteUrls),
        },
      };
    }

    case 'PROFILE_CONTACTS:ADD_SITE': {
      return {
        ...state,
        data: {
          ...state.data,
          websiteUrls: state.data.websiteUrls.concat(''),
        },
        errors: {
          ...state.errors,
        },
      };
    }

    case 'PROFILE_CONTACTS:REMOVE_SITE': {
      const index = action.payload;

      const returnWebSiteUrls = () => {
        const possibleNewWebSiteUrls = [
          ...state.data.websiteUrls.slice(0, index),
          ...state.data.websiteUrls.slice(index + 1),
        ];

        if (possibleNewWebSiteUrls.length !== 0) {
          return possibleNewWebSiteUrls;
        }
        return [
          ...state.data.websiteUrls.slice(0, index),
          ...state.data.websiteUrls.slice(index + 1),
        ].concat('');
      };

      return {
        ...state,
        data: {
          ...state.data,
          websiteUrls: returnWebSiteUrls(),
        },
        errors: {
          ...state.errors,
          websiteUrls: {
            ...state.errors.websiteUrls,
            results: [
              ...state.errors.websiteUrls.results.slice(0, -1),
            ],
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default contacts;
