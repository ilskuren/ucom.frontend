import api from '../api';
import snakes from '../utils/snakes';
import { getToken, removeToken } from '../utils/token';
import loader from '../utils/loader';
// import { enableGtm } from '../utils/gtm';
import { addErrorNotification } from './notifications';
import { setUser } from './';
import { setUnreadNotificationsAmount } from './siteNotifications';

export const addUsers = payload => ({ type: 'ADD_USERS', payload });
export const addUserIFollow = payload => ({ type: 'ADD_USER_I_FOLLOW', payload });
export const removeUserIFollow = payload => ({ type: 'REMOVE_USER_I_FOLLOW', payload });
export const addUserFollowedBy = payload => ({ type: 'ADD_USER_FOLLOWED_BY', payload });
export const removeUserFollowedBy = payload => ({ type: 'REMOVE_USER_FOLLOWED_BY', payload });
export const removeUserFollower = payload => ({ type: 'REMOVE_USER_FOLLOWER', payload });

export const fetchMyself = () => (dispatch) => {
  const token = getToken();

  if (!token) {
    return;
  }

  loader.start();
  api.getMyself(token)
    .then((data) => {
      dispatch(addUsers([data].concat(data.followedBy, data.iFollow)));
      dispatch(setUser(data));
      dispatch(setUnreadNotificationsAmount(data.unreadMessagesCount));

      // TODO: Сделать disable
      // if (process.env.NODE_ENV === 'production' && data.isTrackingAllowed) {
      //   enableGtm();
      // }
    })
    .catch(() => removeToken())
    .then(() => loader.done());
};

export const fetchUser = userId => (dispatch) => {
  loader.start();
  api.getUser(userId)
    .then((data) => {
      dispatch(addUsers([data].concat(data.followedBy, data.iFollow)));
    })
    .catch(error => dispatch(addErrorNotification(error)))
    .then(() => loader.done());
};

export const updateUser = payload => (dispatch) => {
  loader.start();
  api.patchMyself(snakes(payload))
    .then((unfixedData) => {
      const data = { ...unfixedData };
      delete data.currentRate;
      dispatch(addUsers([data].concat(data.followedBy, data.iFollow)));
    })
    .catch(error => dispatch(addErrorNotification(error)))
    .then(() => loader.done());
};

export const followUser = data => (dispatch) => {
  loader.start();
  api.follow(data.user.id, getToken(), data.owner.accountName, data.user.accountName)
    .then(() => {
      dispatch(addUserIFollow({
        userId: +data.owner.id,
        user: data.user,
      }));
      dispatch(addUserFollowedBy({
        userId: +data.user.id,
        user: data.owner,
      }));
    })
    .catch(error => dispatch(addErrorNotification(error)))
    .then(() => loader.done());
};

export const unfollowUser = data => (dispatch) => {
  loader.start();
  api.unfollow(data.user.id, getToken(), data.owner.accountName, data.user.accountName)
    .then(() => {
      dispatch(removeUserIFollow({
        userId: data.owner.id,
        user: data.user,
      }));
      dispatch(removeUserFollowedBy({
        userId: data.user.id,
        user: data.owner,
      }));
    })
    .catch(error => dispatch(addErrorNotification(error)))
    .then(() => loader.done());
};
