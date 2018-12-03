import api from '../api';
import snakes from '../utils/snakes';
import { getToken, removeToken } from '../utils/token';
import loader from '../utils/loader';
// import { enableGtm } from '../utils/gtm';
import { addErrorNotification } from './notifications';
import { setUser } from './';
import { siteNotificationsSetUnreadAmount } from './siteNotifications';
import { getAccountState } from './wallet';
import { addOrganizations } from './organizations';

export const addUsers = payload => ({ type: 'ADD_USERS', payload });
export const addUserIFollow = payload => ({ type: 'ADD_USER_I_FOLLOW', payload });
export const removeUserIFollow = payload => ({ type: 'REMOVE_USER_I_FOLLOW', payload });
export const addUserFollowedBy = payload => ({ type: 'ADD_USER_FOLLOWED_BY', payload });
export const removeUserFollowedBy = payload => ({ type: 'REMOVE_USER_FOLLOWED_BY', payload });
export const removeUserFollower = payload => ({ type: 'REMOVE_USER_FOLLOWER', payload });

export const fetchMyself = () => async (dispatch) => {
  const token = getToken();

  if (!token) {
    return;
  }

  loader.start();

  try {
    const data = await api.getMyself(token);

    dispatch(addUsers([data].concat(data.followedBy, data.iFollow)));
    dispatch(setUser(data));
    dispatch(siteNotificationsSetUnreadAmount(data.unreadMessagesCount));
    dispatch(getAccountState());

    // TODO: Сделать disable
    // if (process.env.NODE_ENV === 'production' && data.isTrackingAllowed) {
    //   enableGtm();
    // }
  } catch (e) {
    console.error(e);
    removeToken();
  }

  loader.done();
};

export const fetchUser = userId => async (dispatch) => {
  loader.start();

  try {
    const data = await api.getUser(userId);

    dispatch(addOrganizations(data.organizations));
    dispatch(addUsers([data].concat(data.followedBy, data.iFollow)));
  } catch (e) {
    console.error(e);
    dispatch(addErrorNotification(e));
  }

  loader.done();
};

export const updateUser = payload => async (dispatch) => {
  loader.start();

  try {
    const data = await api.patchMyself(snakes(payload));

    delete data.currentRate;

    dispatch(addUsers([data].concat(data.followedBy, data.iFollow)));
  } catch (e) {
    console.error(e);
    dispatch(addErrorNotification(e));
  }

  loader.done();
};

export const followUser = data => async (dispatch) => {
  loader.start();

  try {
    await api.follow(data.user.id, getToken(), data.owner.accountName, data.user.accountName);

    dispatch(addUserIFollow({
      userId: Number(data.owner.id),
      user: data.user,
    }));

    dispatch(addUserFollowedBy({
      userId: Number(data.user.id),
      user: data.owner,
    }));
  } catch (e) {
    console.error(e);
    dispatch(addErrorNotification(e));
  }

  loader.done();
};

export const unfollowUser = data => async (dispatch) => {
  loader.start();

  try {
    await api.unfollow(data.user.id, getToken(), data.owner.accountName, data.user.accountName);

    dispatch(removeUserIFollow({
      userId: data.owner.id,
      user: data.user,
    }));

    dispatch(removeUserFollowedBy({
      userId: data.user.id,
      user: data.owner,
    }));
  } catch (e) {
    console.error(e);
    dispatch(addErrorNotification(e));
  }

  loader.done();
};
