import config from '../../package.json';

export const getYearsFromBirthday = (birthday) => {
  const currentYear = (new Date()).getFullYear();
  const year = birthday.split('-')[0];

  return currentYear - year;
};

export const getAvatarUrl = filename => (
  `${config.backend.httpEndpoint}/upload/${filename}`
);

export const getUserLink = userId => (
  `/user/${userId}`
);

export const getYearOfDate = date => (
  date.split('-')[0]
);

export const getUserName = (user) => {
  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  } else if (user.first_name) {
    return user.first_name;
  }

  return user.account_name;
};
