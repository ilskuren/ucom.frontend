import Validator from 'validatorjs';
import * as rules from '../../utils/validators/';

rules.registerArrayUrls.rule(Validator);
rules.registerPhoneNumber.rule(Validator);

const getInitialState = () => ({
  data: {
    email: '',
    phoneNumber: '',
    websiteUrls: [''],
  },
  rules: {
    email: 'required|email',
    phoneNumber: `required|${rules.registerPhoneNumber.name}`,
    websiteUrls: rules.registerArrayUrls.name,
  },
  errors: {
    email: null,
    phoneNumber: null,
    websiteUrls: [null],
  },
  isValid: false,
});

const contacts = (state = getInitialState(), action) => {
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
        errors: {
          ...state.errors,
          phoneNumber: validation.errors.get('phoneNumber'),
        },
      };
    }


    case 'PROFILE_CONTACTS:VALIDATE_CONTACTS': {
      const validation = new Validator(state.data, state.rules);

      return {
        ...state,
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

      const returnWebSiteUrlsErrors = () => {
        if (Array.isArray(state.errors.websiteUrls)) {
          if (index > state.errors.websiteUrls.length) {
            return [...state.errors.websiteUrls, validation.errors.get('websiteUrls')];
          }
          return state.errors.websiteUrls.map((error, innerIndex) => {
            if (index !== innerIndex) {
              return error;
            }
            return validation.errors.get('websiteUrls');
          });
        }
        return [validation.errors.get('websiteUrls')];
      };

      // const returnWebSiteUrlsErrors = () => {
      //   return data.websiteUrls.map((webSiteUrl, webSiteIndex) => {
      //     return validation.errors.get('websiteUrls')
      //   })
      // };

      return {
        ...state,
        data,
        isValid: validation.passes(),
        errors: {
          ...state.errors,
          websiteUrls: returnWebSiteUrlsErrors(),
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
          websiteUrls: [
            ...state.errors.websiteUrls,
            null,
          ],
        },
      };
    }

    case 'PROFILE_CONTACTS:REMOVE_SITE': {
      const index = action.payload;

      return {
        ...state,
        data: {
          ...state.data,
          websiteUrls: [
            ...state.data.websiteUrls.slice(0, index),
            ...state.data.websiteUrls.slice(index + 1),
          ],
        },
        errors: {
          ...state.errors,
          websiteUrls: [
            ...state.errors.websiteUrls.slice(0, -1),
          ],
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default contacts;
