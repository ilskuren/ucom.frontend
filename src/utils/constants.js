import * as rules from './validators/';

export const scrollAnimation = {
  duration: 1500,
  delay: 100,
  smooth: true,
};

export const validatorRules = {
  user: {
    generalInfoRules: {
      firstName: 'string',
      lastName: 'string',
      nickname: 'string',
      birthday: 'string',
      country: 'string',
      city: 'string',
      address: 'string',
    },
    contactsRules: {
      email: 'email',
      phoneNumber: `${rules.registerPhoneNumber.name}`,
    },
    workAndEducationRules: {
      firstCurrency: 'string',
      firstCurrencyYear: 'string',
      userJobs: 'array',
      userEducations: 'array',
    },
  },
};
