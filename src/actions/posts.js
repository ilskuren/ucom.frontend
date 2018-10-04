import api from '../api';
import { addUsers } from './users';

export const addPosts = payload => ({ type: 'ADD_POSTS', payload });

export const fetchUserPosts = userId => (dispatch) => {
  api.getUserPosts(userId)
    .then((data) => {
      dispatch(addPosts(data));
    });
};

export const fetchOrganizationPosts = organizationId => (dispatch) => {
  api.getOrganizationPosts(organizationId)
    .then((data) => {
      dispatch(addUsers(data.data.map(item => item.user)));
      dispatch(addPosts(data.data));
    });
};
