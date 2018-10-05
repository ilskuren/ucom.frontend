import api from '../api';
import snakes from '../utils/snakes';

export const addUsers = payload => ({ type: 'ADD_USERS', payload });
export const addUser = payload => ({ type: 'ADD_USER', payload });

export const fetchUser = userId => (dispatch) => {
  api.getUser(userId)
    .then((data) => {
      dispatch(addUser(data));
    });
};

export const updateUser = data => (dispatch) => {
  api.patchMyself(snakes(data))
    .then((data) => {
      dispatch(addUser(data));
    });
};
