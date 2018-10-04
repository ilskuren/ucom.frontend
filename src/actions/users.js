import api from '../api';

export const addUsers = payload => ({ type: 'ADD_USERS', payload });
export const addUser = payload => ({ type: 'ADD_USER', payload });

export const fetchUser = userId => (dispatch) => {
  api.getUser(userId)
    .then((data) => {
      dispatch(addUser(data));
    });
};
