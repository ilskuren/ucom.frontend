import { urlRegex } from './constants';

export const registerPhoneNumber = {
  name: 'PhoneNumber',
  rule: (Validator, regex) => {
    Validator.register(registerPhoneNumber.name, (value) => {
      if (typeof value !== 'string') {
        return false;
      }
      return value.match(regex);
    }, 'The phone number format is invalid.');
  },
};

export const registerUrl = {
  name: 'shortUrl',
  rule: (Validator) => {
    Validator.register(registerUrl.name, (value) => {
      const regexUrl = new RegExp(urlRegex);
      return typeof value === 'string' && regexUrl.test(value);
    }, 'The field name url format is invalid.');
  },
};
