import humps from 'lodash-humps';
import api from '../api';
import { addUsers } from './users';
import { UPVOTE_STATUS, DOWNVOTE_STATUS } from '../utils/posts';

export const addPosts = payload => ({ type: 'ADD_POSTS', payload });
export const addPost = payload => ({ type: 'ADD_POST', payload });
export const setPostVote = payload => ({ type: 'SET_POST_VOTE', payload });

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
      dispatch(setPostVote({
        id: postId,
        currentVote: data.currentVote,
        myselfVote: UPVOTE_STATUS,
      }));
    });
};

export const postVoteDown = postId => (dispatch) => {
  api.vote(false, postId)
    .then(humps)
    .then((data) => {
      dispatch(setPostVote({
        id: postId,
        currentVote: data.currentVote,
        myselfVote: DOWNVOTE_STATUS,
      }));
    });
};
