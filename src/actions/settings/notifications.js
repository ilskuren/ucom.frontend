import { SETTINGS } from 'utils/actionTypes';

export const setSettingsNotificationsData = payload => ({ type: SETTINGS.SET_NOTIFICATIONS_DATA, payload });
export const resetSettingsNotifications = () => ({ type: SETTINGS.RESET_NOTIFICATIONS });
