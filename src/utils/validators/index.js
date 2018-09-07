export const registerArrayUrls = {
  name: 'ArrayUrls',
  rule: (Validator) => {
    Validator.register(registerArrayUrls.name, (value) => {
      if (!Array.isArray(value)) {
        return false;
      }
      const isValidUrl = url => typeof url === 'string' && /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(url);
      return value.every(isValidUrl);
    });
  },
};

export const registerPhoneNumber = {
  name: 'PhoneNumber',
  rule: (Validator) => {
    Validator.register(registerPhoneNumber.name, (value) => {
      if (typeof value !== 'string') {
        return false;
      }
      return value.match(/^\d{4}-\d{4}$/);
    }, 'The phone number is not in the format XXXX-XXXX.');
  },
};
