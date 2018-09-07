export const registerPhoneNumber = {
  name: 'PhoneNumber',
  rule: (Validator, regex) => {
    Validator.register(registerPhoneNumber.name, (value) => {
      if (typeof value !== 'string') {
        return false;
      }
      return value.match(regex);
    }, 'The phone number is not in the format XXXX-XXXX.');
  },
};
