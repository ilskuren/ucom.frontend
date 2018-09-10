import { selectProfileContacts } from './index';

export function selectEmail(state) {
  return selectProfileContacts(state).data.email;
}

export function selectPhoneNumber(state) {
  return selectProfileContacts(state).data.email;
}

export function selectWebsiteUrls(state) {
  return selectProfileContacts(state).data.websiteUrls;
}

export function selectContactsValidity(state) {
  return selectProfileContacts(state).isValid;
}

export function selectContactsErrors(state) {
  return selectProfileContacts(state).errors;
}
