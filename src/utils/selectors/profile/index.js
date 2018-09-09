export function selectProfile(state) {
  return state.profile;
}

export function selectProfileContacts(state) {
  return selectProfile(state).contacts;
}

export function selectProfileGeneralInfo(state) {
  return selectProfile(state).generalInfo;
}

export function selectProfileWorkAndEducations(state) {
  return selectProfile(state).workAndEducation;
}
