export function selectUser(state) {
  return state.user;
}

export function selectUserGeneralInfo(state) {
  const { user } = state;
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

export function selectUserContacts(state) {
  const { user } = state;
  return {
    email: user.email,
    phoneNumber: user.phoneNumber,
    personalWebsiteUrl: user.personalWebsiteUrl,
    userSources: user.userSources,
  };
}

export function selectUserId(state) {
  return state.user.id;
}
