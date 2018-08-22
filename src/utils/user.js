import config from '../../package.json';

export const getYearsFromBirthday = (birthday) => {
  const currentYear = (new Date()).getFullYear();
  const year = birthday.split('-')[0];

  return currentYear - year;
};

export const getAvatarUrl = filename => (
  `${config.backend.httpEndpoint}/upload/${filename}`
);
