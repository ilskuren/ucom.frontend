import api from '../api';
import { addUsers } from './users';

export const addPosts = payload => ({ type: 'ADD_POSTS', payload });
export const setPostVoteUp = payload => ({ type: 'SET_POST_VOTE_UP', payload });
export const setPostVoteDown = payload => ({ type: 'SET_POST_VOTE_DOWN', payload });

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
    .then(() => {
      dispatch(setPostVoteUp(postId));
    });
};

export const postVoteDown = postId => (dispatch) => {
  api.vote(false, postId)
    .then(() => {
      dispatch(setPostVoteDown(postId));
    });
};
