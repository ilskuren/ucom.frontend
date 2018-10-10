import api from '../api';
import snakes from '../utils/snakes';
import { getToken } from '../utils/token';
import loader from '../utils/loader';

export const addUsers = payload => ({ type: 'ADD_USERS', payload });
export const addUserFollower = payload => ({ type: 'ADD_USER_FOLLOWER', payload });
export const removeUserFollower = payload => ({ type: 'REMOVE_USER_FOLLOWER', payload });

export const fetchMyself = () => (dispatch) => {
  loader.start();
  api.getMyself(getToken())
    .then((data) => {
      dispatch(addUsers([data].concat(data.followedBy, data.iFollow)));
    })
    .catch(() => loader.done())
    .then(() => loader.done());
};

export const fetchUser = userId => (dispatch) => {
  loader.start();
  api.getUser(userId)
    .then((data) => {
      dispatch(addUsers([data].concat(data.followedBy, data.iFollow)));
    })
    .catch(() => loader.done())
    .then(() => loader.done());
};

export const updateUser = data => (dispatch) => {
  loader.start();
  api.patchMyself(snakes(data))
    .then((data) => {
      dispatch(addUsers([data].concat(data.followedBy, data.iFollow)));
    })
    .catch(() => loader.done())
    .then(() => loader.done());
};

export const followUser = data => (dispatch) => {
  loader.start();
  api.follow(data.user.id, getToken(), data.userAccountName, data.user.accountName)
    .then(() => {
      dispatch(addUserFollower(data));
    })
    .catch(() => loader.done())
    .then(() => loader.done());
};

export const unfollowUser = data => (dispatch) => {
  loader.start();
  api.unfollow(data.user.id, getToken(), data.userAccountName, data.user.accountName)
    .then(() => {
      dispatch(removeUserFollower(data));
    })
    .catch(() => loader.done())
    .then(() => loader.done());
};
