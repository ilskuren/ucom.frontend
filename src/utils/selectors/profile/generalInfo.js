import { selectProfileGeneralInfo } from './index';

export function selectFirstName(state) {
  return selectProfileGeneralInfo(state).data.firstName;
}

export function selectLastName(state) {
  return selectProfileGeneralInfo(state).data.lastName;
}

export function selectNickname(state) {
  return selectProfileGeneralInfo(state).data.nickname;
}

export function selectAbout(state) {
  return selectProfileGeneralInfo(state).data.about;
}

export function selectBirthday(state) {
  return selectProfileGeneralInfo(state).data.birthday;
}

export function selectCountry(state) {
  return selectProfileGeneralInfo(state).data.country;
}

export function selectCity(state) {
  return selectProfileGeneralInfo(state).data.city;
}

export function selectAddress(state) {
  return selectProfileGeneralInfo(state).data.address;
}

export function selectCurrencyToShow(state) {
  return selectProfileGeneralInfo(state).data.currencyToShow;
}

export function selectAvatarFilename(state) {
  return selectProfileGeneralInfo(state).data.avatarFilename;
}

export function selectGeneralInfoValidity(state) {
  return selectProfileGeneralInfo(state).isValid;
}

export function selectGeneralInfoErrors(state) {
  return selectProfileGeneralInfo(state).errors;
}
