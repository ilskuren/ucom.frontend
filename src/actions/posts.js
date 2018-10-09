import humps from 'lodash-humps';
import api from '../api';
import { addUsers } from './users';
import { UPVOTE_STATUS, DOWNVOTE_STATUS } from '../utils/posts';
import { parseErrors } from '../utils/errors';
import { addErrorNotification } from './notifications';
import { addComments } from './comments';

export const addPosts = payload => ({ type: 'ADD_POSTS', payload });
export const setPostVote = payload => ({ type: 'SET_POST_VOTE', payload });

export const fetchPost = postId => (dispatch) => {
  api.getPost(postId)
    .then((data) => {
      dispatch(addComments(humps(data.comments)));
      dispatch(addPosts([data]));
    });
};

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

export const postVote = payload => (dispatch) => {
  api.vote(payload.isUp, payload.postId)
    .then(humps)
    .then((data) => {
      dispatch(setPostVote({
        id: payload.postId,
        currentVote: data.currentVote,
        myselfVote: payload.isUp ? UPVOTE_STATUS : DOWNVOTE_STATUS,
      }));
    })
    .catch((error) => {
      dispatch(addErrorNotification(parseErrors(error).general));
    });
};

export const createCommentPost = payload => (dispatch) => {
  api.createCommentPost(payload)
    .then((data) => {
      dispatch(addPosts(data.data));
    })
    .catch((error) => {
      dispatch(addErrorNotification(parseErrors(error).general));
    });
};
