import humps from 'lodash-humps';
import api from '../api';
import { addUsers } from './users';

export const addPosts = payload => ({ type: 'ADD_POSTS', payload });
export const addPost = payload => ({ type: 'ADD_POST', payload });

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

export const postVoteUp = postId => (dispatch) => {
  api.vote(true, postId)
    .then(humps)
    .then((data) => {
      dispatch(addPost({
        id: postId,
        currentVote: data.currentVote,
      }));
    });
};

export const postVoteDown = postId => (dispatch) => {
  api.vote(true, postId)
    .then(humps)
    .then((data) => {
      dispatch(addPost({
        id: postId,
        currentVote: data.currentVote,
      }));
    });
};
