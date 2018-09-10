export function selectProfile(state) {
  return state.profile;
}

export function selectProfileContacts(state) {
  return selectProfile(state).contacts;
}

export function selectProfileWorkAndEducations(state) {
  return selectProfile(state).workAndEducation;
}

export function selectProfileGeneralInfo(state) {
  return selectProfile(state).generalInfo;
}


export * from './contacts';
export * from './workAndEducations';
export * from './generalInfo';
