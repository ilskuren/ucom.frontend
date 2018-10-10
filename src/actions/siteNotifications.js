import socket from '../api/socket';

export const showNotificationTooltip = () => ({ type: 'SHOW_NOTIFICATIONS_TOOLTIP' });
export const hideNotificationTooltip = () => ({ type: 'HIDE_NOTIFICATIONS_TOOLTIP' });
export const triggerNotificationTooltip = () => ({ type: 'TRIGGER_NOTIFICATIONS_TOOLTIP' });
export const resetNotificationTooltip = () => ({ type: 'RESET_NOTIFICATIONS_TOOLTIP' });
export const addSiteNotifications = payload => ({ type: 'ADD_SITE_NOTIFICATIONS', payload });
export const editSiteNotification = payload => ({ type: 'EDIT_SITE_NOTIFICATION', payload });
export const deleteSiteNotification = payload => ({ type: 'DELETE_SITE_NOTIFICATION', payload });

export const initNotificationsListeners = () => (dispatch) => {
  socket.on('addSiteNotifications', (res) => {
    dispatch(addSiteNotifications(res));
  });

  socket.on('editSiteNotification', (res) => {
    dispatch(editSiteNotification(res));
  });

  socket.on('deleteSiteNotification', (res) => {
    dispatch(deleteSiteNotification(res));
  });
};
