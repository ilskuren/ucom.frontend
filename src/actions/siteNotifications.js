import socket from '../api/socket';
import api from '../api';
import loader from '../utils/loader';
import { parseErrors } from '../utils/errors';
import { addErrorNotification } from './notifications';

export const showNotificationTooltip = () => ({ type: 'SHOW_NOTIFICATIONS_TOOLTIP' });
export const hideNotificationTooltip = () => ({ type: 'HIDE_NOTIFICATIONS_TOOLTIP' });
export const resetNotificationTooltip = () => ({ type: 'RESET_NOTIFICATIONS_TOOLTIP' });
export const addSiteNotifications = payload => ({ type: 'ADD_SITE_NOTIFICATIONS', payload });
export const deleteSiteNotification = payload => ({ type: 'DELETE_SITE_NOTIFICATION', payload });
export const setUnreadNotificationsAmount = payload => ({ type: 'SET_UNREAD_NOTIFICATIONS_AMOUNT', payload });

export const fetchNotifications = payload => async (dispatch) => {
  loader.start();
  try {
    const res = await api.getNotifications(payload.perPage, payload.page);
    console.log(res);
    dispatch(addSiteNotifications({ data: res.data, metadata: res.metadata }));
  } catch (error) {
    dispatch(addErrorNotification(parseErrors(error).general));
  }
  loader.done();
};

export const showAndFetchNotifications = () => (dispatch) => {
  dispatch(showNotificationTooltip());
  dispatch(fetchNotifications({ perPage: 7, page: 1 }));
};

export const confirmNotification = id => async (dispatch, getState) => {
  loader.start();
  try {
    const res = await api.confirmNotification(id);
    dispatch(addSiteNotifications({ data: [res] }));
    // TODO: Получать данные о количетсве непрочитанных от сервера
    dispatch(setUnreadNotificationsAmount(getState().siteNotifications.totalUnreadAmount - 1));
  } catch (error) {
    dispatch(addErrorNotification(parseErrors(error).general));
  }
  loader.done();
};

export const declineNotification = id => async (dispatch, getState) => {
  loader.start();
  try {
    const res = await api.declineNotification(id);
    dispatch(addSiteNotifications({ data: [res] }));
    // TODO: Получать данные о количетсве непрочитанных от сервера
    dispatch(setUnreadNotificationsAmount(getState().siteNotifications.totalUnreadAmount - 1));
  } catch (error) {
    dispatch(addErrorNotification(parseErrors(error).general));
  }
  loader.done();
};

export const initNotificationsListeners = () => (dispatch) => {
  socket.on('notification', (res) => {
    if (res.unread_messages_count) {
      dispatch(setUnreadNotificationsAmount(res.unread_messages_count));
    }
  });
};
