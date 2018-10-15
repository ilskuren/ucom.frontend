import socket from '../api/socket';
import api from '../api';
import loader from '../utils/loader';

export const showNotificationTooltip = () => ({ type: 'SHOW_NOTIFICATIONS_TOOLTIP' });
export const hideNotificationTooltip = () => ({ type: 'HIDE_NOTIFICATIONS_TOOLTIP' });
export const triggerNotificationTooltip = () => ({ type: 'TRIGGER_NOTIFICATIONS_TOOLTIP' });
export const resetNotificationTooltip = () => ({ type: 'RESET_NOTIFICATIONS_TOOLTIP' });
export const addSiteNotifications = payload => ({ type: 'ADD_SITE_NOTIFICATIONS', payload });
export const editSiteNotification = payload => ({ type: 'EDIT_SITE_NOTIFICATION', payload });
export const deleteSiteNotification = payload => ({ type: 'DELETE_SITE_NOTIFICATION', payload });
export const setUnreadNotificationsAmount = payload => ({ type: 'SET_UNREAD_NOTIFICATIONS_AMOUNT', payload });
export const fetchNotifications = () => (dispatch) => {
  loader.start();
  api.getNotifications()
    .then((data) => {
      dispatch(addSiteNotifications(data));
    })
    .catch(() => loader.done())
    .then(() => loader.done());
};
export const initNotificationsListeners = () => (dispatch) => {
  // socket.on('addSiteNotifications', (res) => {
  //   dispatch(addSiteNotifications(res));
  // });

  // socket.on('editSiteNotification', (res) => {
  //   dispatch(editSiteNotification(res));
  // });

  // socket.on('deleteSiteNotification', (res) => {
  //   dispatch(deleteSiteNotification(res));
  // });
  socket.on('notification', (res) => {
    dispatch(setUnreadNotificationsAmount(res.metadata));
  });
};

