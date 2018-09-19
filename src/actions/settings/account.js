import { SETTINGS } from 'utils/actionTypes';

export const setSettingsAccountData = payload => ({ type: SETTINGS.SET_ACCOUNT_DATA, payload });
export const resetSettingsAccount = () => ({ type: SETTINGS.RESET_ACCOUNT });
export const validateSettingsAccountField = payload => ({ type: SETTINGS.VALIDATE_ACCOUNT_FIELD, payload });
