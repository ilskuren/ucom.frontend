import { SETTINGS } from '../../utils/actionTypes';

export const resetSettingsSecurity = () => ({ type: SETTINGS.RESET_SECURITY });
export const setSettingsSecurityData = payload => ({ type: SETTINGS.SET_SECURITY_DATA, payload });
