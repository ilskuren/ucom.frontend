export function selectProfile(state) {
  return state.profile;
}

export function selectProfileContacts(state) {
  return selectProfile(state).contacts;
}

export function selectSettingsGeneralInfo(state) {
  return selectProfile(state).generalInfo;
}

export function selectSettingsWorkAndEducations(state) {
  return selectProfile(state).workAndEducations;
}
