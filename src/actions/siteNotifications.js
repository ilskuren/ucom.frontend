import socket from '../api/socket';
import api from '../api';
import loader from '../utils/loader';
import { parseErrors } from '../utils/errors';
import { addErrorNotification } from './notifications';

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// const someNotification = [
//   {
//     username: 'sdbsds sdbsd',
//     time: 'today at ddsbds1 am',
//     avatar: 'https://steamuserimages-a.akamaihd.net/ugc/933814008881052459/22818793B6D9C730A788E677F998933F9EDDE0B7/',
//     description: '1111 following you',
//     id: 221,
//     recent: true,
//     typeOfFeedIcon: 'upvote',
//   },
//   {
//     username: 'Suzan Born',
//     time: 'today at 9:11 am',
//     avatar: 'https://steamuserimages-a.akamaihd.net/ugc/933814008881052459/22818793B6D9C730A788E677F998933F9EDDE0B7/',
//     description: 'started following you',
//     recent: true,
//     id: 5,
//     typeOfFeedIcon: 'mentioned',
//   },
//   {
//     username: 'Shiro',
//     time: 'today at 3:21 pm',
//     avatar: 'http://profilepicturesdp.com/wp-content/uploads/2018/07/matching-profile-pictures-sun-night-4-1.jpg',
//     description: 'started following your organization Taboon Common',
//     recent: true,
//     postCover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Parking_icon.svg/600px-Parking_icon.svg.png',
//     id: 6,
//   },
//   {
//     time: 'today at 9:11 am',
//     description: 'Welcome my friend. You just joined the U. Community. We sent a confirmation letter on your e-mail.',
//     id: 14,
//     recent: true,
//     typeOfFeedIcon: 'congratulations',
//   },
//   {
//     username: 'Shiro',
//     time: 'today at 3:21 pm',
//     avatar: 'http://profilepicturesdp.com/wp-content/uploads/2018/07/matching-profile-pictures-sun-night-4-1.jpg',
//     description: 'started following your organization Taboon Common',
//     recent: true,
//     postCover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Parking_icon.svg/600px-Parking_icon.svg.png',
//     id: 436,
//   },
//   {
//     username: 'Suzan Born',
//     time: 'today at 9:11 am',
//     avatar: 'https://steamuserimages-a.akamaihd.net/ugc/933814008881052459/22818793B6D9C730A788E677F998933F9EDDE0B7/',
//     description: 'started following you',
//     recent: true,
//     id: 244,
//   },
//   {
//     username: 'Shiro',
//     time: 'today at 3:21 pm',
//     avatar: 'http://profilepicturesdp.com/wp-content/uploads/2018/07/matching-profile-pictures-sun-night-4-1.jpg',
//     description: 'started following your organization Taboon Common',
//     recent: true,
//     postCover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Parking_icon.svg/600px-Parking_icon.svg.png',
//     id: 35,
//   },
// ];

export const showNotificationTooltip = () => ({ type: 'SHOW_NOTIFICATIONS_TOOLTIP' });
export const hideNotificationTooltip = () => ({ type: 'HIDE_NOTIFICATIONS_TOOLTIP' });
export const resetNotificationTooltip = () => ({ type: 'RESET_NOTIFICATIONS_TOOLTIP' });
export const addSiteNotifications = payload => ({ type: 'ADD_SITE_NOTIFICATIONS', payload });
export const deleteSiteNotification = payload => ({ type: 'DELETE_SITE_NOTIFICATION', payload });
export const setUnreadNotificationsAmount = payload => ({ type: 'SET_UNREAD_NOTIFICATIONS_AMOUNT', payload });

export const showAndFetchNotifications = () => async (dispatch) => {
  dispatch(showNotificationTooltip());
  loader.start();
  try {
    const res = await api.getNotifications();
    dispatch(addSiteNotifications({ data: res.data }));
  } catch (error) {
    dispatch(addErrorNotification(parseErrors(error).general));
  }
  loader.done();
};

export const confirmNotification = id => async (dispatch) => {
  loader.start();
  try {
    const res = await api.confirmNotification(id);
    dispatch(addSiteNotifications({ data: [res] }));
  } catch (error) {
    dispatch(addErrorNotification(parseErrors(error).general));
  }
  loader.done();
};

export const declineNotification = id => async (dispatch) => {
  loader.start();
  try {
    const res = await api.declineNotification(id);
    dispatch(addSiteNotifications({ data: [res] }));
  } catch (error) {
    dispatch(addErrorNotification(parseErrors(error).general));
  }
  loader.done();
};

export const initNotificationsListeners = () => (dispatch) => {
  // socket.on('addSiteNotifications', (res) => {
  //   dispatch(addSiteNotifications(res));
  // });


  // socket.on('deleteSiteNotification', (res) => {
  //   dispatch(deleteSiteNotification(res));
  // });
  socket.on('notification', (res) => {
    dispatch(setUnreadNotificationsAmount(res.metadata));
  });
};

