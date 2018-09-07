export function selectSettings(state) {
  return state.settings;
}

export function selectSettingsAccount(state) {
  return selectSettings(state).account;
}

export function selectSettingsSecurity(state) {
  return selectSettings(state).security;
}

export function selectSettingsNotifications(state) {
  return selectSettings(state).notifications;
}

export function selectSettingsBlacklist(state) {
  return selectSettings(state).blacklist;
}

export function selectSettingsReferral(state) {
  return selectSettings(state).referral;
}
