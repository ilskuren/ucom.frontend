import api from '../api';
import snakes from '../utils/snakes';
import { getToken } from '../utils/token';

export const addUsers = payload => ({ type: 'ADD_USERS', payload });
export const addUserFollower = payload => ({ type: 'ADD_USER_FOLLOWER', payload });
export const removeUserFollower = payload => ({ type: 'REMOVE_USER_FOLLOWER', payload });

export const fetchMyself = () => (dispatch) => {
  api.getMyself(getToken())
    .then((data) => {
      dispatch(addUsers([data].concat(data.followedBy, data.iFollow)));
    });
};

export const fetchUser = userId => (dispatch) => {
  api.getUser(userId)
    .then((data) => {
      dispatch(addUsers([data].concat(data.followedBy, data.iFollow)));
    });
};

export const updateUser = data => (dispatch) => {
  api.patchMyself(snakes(data))
    .then((data) => {
      dispatch(addUsers([data].concat(data.followedBy, data.iFollow)));
    });
};

export const followUser = data => (dispatch) => {
  api.follow(data.user.id, getToken(), data.userAccountName, data.user.accountName)
    .then(() => {
      dispatch(addUserFollower(data));
    });
};

export const unfollowUser = data => (dispatch) => {
  api.unfollow(data.user.id, getToken(), data.userAccountName, data.user.accountName)
    .then(() => {
      dispatch(removeUserFollower(data));
    });
};
