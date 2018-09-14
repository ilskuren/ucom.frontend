export function selectUser(state) {
  return state.user;
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
