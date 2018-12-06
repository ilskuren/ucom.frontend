import humps from 'lodash-humps';

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

export const getUserEditProfileUrl = () => '/profile/';

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

  const userData = humps(user);

  if (userData.firstName) {
    return userData.firstName;
  }

  return userData.accountName;
};

export const userIsFollowed = (followers, userId) => {
  if (!followers || !followers.length || !userId) {
    return false;
  }

  return !!followers.find(i => +i.id === +userId);
};
