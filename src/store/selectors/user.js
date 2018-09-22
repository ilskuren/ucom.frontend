export function selectUser(state) {
  return state.user.data;
}

export function selectUserAvatarFilename(state) {
  const user = selectUser(state);
  return user.avatarFilename;
}

export function selectUserGeneralInfo(state) {
  const user = selectUser(state);
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    nickname: user.nickname,
    currencyToShow: user.currencyToShow,
    country: user.country,
    city: user.city,
    address: user.address,
    about: user.about,
    birthday: user.birthday,
  };
}

export function selectUserWorkAndEducation(state) {
  const user = selectUser(state);
  return {
    firstCurrency: user.firstCurrency,
    firstCurrencyYear: user.firstCurrencyYear,
    userJobs: user.userJobs,
    userEducations: user.userEducations,
  };
}


export function selectUserContacts(state) {
  const user = selectUser(state);
  return {
    email: user.email,
    phoneNumber: user.phoneNumber,
    personalWebsiteUrl: user.personalWebsiteUrl,
    userSources: user.userSources,
  };
}

export function selectUserId(state) {
  return selectUser(state).id;
}
