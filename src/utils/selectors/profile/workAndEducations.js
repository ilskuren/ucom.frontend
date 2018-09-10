import { selectProfileWorkAndEducations } from './index';

export function selectFirstCurrency(state) {
  return selectProfileWorkAndEducations(state).data.firstCurrency;
}

export function selectFirstCurrencyYear(state) {
  return selectProfileWorkAndEducations(state).data.firstCurrencyYear;
}

export function selectUserJobs(state) {
  return selectProfileWorkAndEducations(state).data.userJobs;
}

export function selectUserEducations(state) {
  return selectProfileWorkAndEducations(state).data.userEducations;
}

export function selectWorkAndEducationValidity(state) {
  return selectProfileWorkAndEducations(state).isValid;
}

export function selectWorkAndEducationErrors(state) {
  return selectProfileWorkAndEducations(state).errors;
}
