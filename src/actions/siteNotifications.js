import socket from '../api/socket';
import api from '../api';
import loader from '../utils/loader';
import { addErrorNotification } from './notifications';
import { getOrganization } from './organizations';
import { PER_PAGE, INITTIAL_PAGE } from '../utils/notifications';
import { blockPageContent, unblockPageContent } from '../utils/page';
import { isMobile } from '../utils/mediaQueries';

export const showNotificationTooltip = () => {
  if (isMobile()) {
    blockPageContent();
  }

  return ({ type: 'SITE_NOTIFICATIONS__SHOW_TOOLTIP' });
};

export const hideNotificationTooltip = () => {
  if (isMobile()) {
    unblockPageContent();
  }

  return ({ type: 'SITE_NOTIFICATIONS__HIDE_TOOLTIP' });
};

export const siteNotificationsResetTooltip = () => ({ type: 'SITE_NOTIFICATIONS__RESET_TOOLTIP' });
export const siteNotificationsResetTooltipData = () => ({ type: 'SITE_NOTIFICATIONS__RESET_TOOLTIP_DATA' });
export const siteNotificationsAddItems = payload => ({ type: 'SITE_NOTIFICATIONS__ADD_ITEMS', payload });
export const siteNotificationsDeleteItems = payload => ({ type: 'SITE_NOTIFICATIONS__DELETE_ITEMS', payload });
export const siteNotificationsSetUnreadAmount = payload => ({ type: 'SITE_NOTIFICATIONS__SET_UNREAD_AMOUNT', payload });
export const siteNotificationsSetLoading = payload => ({ type: 'SITE_NOTIFICATIONS__SET_LOADING', payload });

export const fetchNotifications = (payload = {}) => async (dispatch) => {
  payload = {
    perPage: payload.perPage || PER_PAGE,
    page: payload.page || INITTIAL_PAGE,
  };
  loader.start();
  dispatch(siteNotificationsSetLoading(true));
  try {
    const res = await api.getNotifications(payload.perPage, payload.page);
    dispatch(siteNotificationsAddItems({ data: res.data, metadata: res.metadata }));
    dispatch(siteNotificationsSetLoading(false));
  } catch (error) {
    dispatch(addErrorNotification(error));
  }
  loader.done();
};

export const showAndFetchNotifications = () => (dispatch) => {
  dispatch(showNotificationTooltip());
  dispatch(fetchNotifications());
};

export const confirmNotification = ({ id, idOfOrg }) => async (dispatch) => {
  loader.start();
  try {
    const res = await api.confirmNotification(id);
    dispatch(siteNotificationsAddItems({ data: [res] }));
    dispatch(siteNotificationsSetUnreadAmount(res.myselfData.unreadMessagesCount));
    dispatch(getOrganization(idOfOrg));
  } catch (error) {
    dispatch(addErrorNotification(error));
  }
  loader.done();
};

export const declineNotification = id => async (dispatch) => {
  loader.start();
  try {
    const res = await api.declineNotification(id);
    dispatch(siteNotificationsAddItems({ data: [res] }));
    dispatch(siteNotificationsSetUnreadAmount(res.myselfData.unreadMessagesCount));
  } catch (error) {
    dispatch(addErrorNotification(error));
  }
  loader.done();
};

export const seenNotification = id => async (dispatch) => {
  try {
    const res = await api.seenNotification(id);
    dispatch(siteNotificationsAddItems({ data: [res] }));
    dispatch(siteNotificationsSetUnreadAmount(res.myselfData.unreadMessagesCount));
  } catch (error) {
    dispatch(addErrorNotification(error));
  }
};

export const initNotificationsListeners = () => (dispatch) => {
  socket.on('notification', (res) => {
    if (res.unread_messages_count) {
      dispatch(siteNotificationsSetUnreadAmount(res.unread_messages_count));
      dispatch(fetchNotifications());
    }
  });
};
