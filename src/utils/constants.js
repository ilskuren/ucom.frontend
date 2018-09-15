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
      personalWebsiteUrl: `${rules.registerUrl.name}`,
      phoneNumber: `${rules.registerPhoneNumber.name}`,
    },
    workAndEducationRules: {
      firstCurrency: 'string',
      firstCurrencyYear: 'regex:/^[0-9]*$/',
      userJobs: 'array',
      userEducations: 'array',
    },
  },
};
