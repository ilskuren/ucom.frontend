import dict from './dict';

export const getYearsFromBirthday = (value) => {
  if (!value) {
    return null;
  }

  const birthday = new Date(value);
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const getUserUrl = (userId) => {
  if (!userId) {
    return null;
  }

  return `/user/${userId}`;
};

export const getYearOfDate = (date) => {
  if (!date) {
    return null;
  }

  return date.split('-')[0];
};

export const getUserName = (user) => {
  if (!user) {
    return null;
  }

  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  } else if (user.first_name) {
    return user.first_name;
  }

  return user.account_name;
};

export const validateAuth = (fields = {}) => {
  const errors = [];

  if (!fields.account_name) {
    errors.push({
      field: 'account_name',
      message: dict.accountNameIsRequired,
    });
  }

  if (!(fields.brainkey && fields.brainkey.trim().split(' ').length === 12)) {
    errors.push({
      field: 'brainkey',
      message: dict.brainkeyValidationError,
    });
  }

  return errors;
};
