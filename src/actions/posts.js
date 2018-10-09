import humps from 'lodash-humps';
import api from '../api';
import { addUsers } from './users';
import { UPVOTE_STATUS, DOWNVOTE_STATUS } from '../utils/posts';
import { parseErrors } from '../utils/errors';
import { addErrorNotification } from './notifications';
import { addComments } from './comments';
import loader from '../utils/loader';

export const addPosts = payload => ({ type: 'ADD_POSTS', payload });
export const setPostVote = payload => ({ type: 'SET_POST_VOTE', payload });

export const fetchPost = postId => (dispatch) => {
  loader.start();
  api.getPost(postId)
    .then((data) => {
      dispatch(addComments(humps(data.comments)));
      dispatch(addPosts([data]));
    })
    .then(() => loader.done());
};

export const fetchUserPosts = userId => (dispatch) => {
  loader.start();
  api.getUserPosts(userId)
    .then((data) => {
      dispatch(addPosts(data));
    })
    .then(() => loader.done());
};

export const fetchOrganizationPosts = organizationId => (dispatch) => {
  loader.start();
  api.getOrganizationPosts(organizationId)
    .then((data) => {
      dispatch(addUsers(data.data.map(item => item.user)));
      dispatch(addPosts(data.data));
    })
    .then(() => loader.done());
};

export const postVote = payload => (dispatch) => {
  loader.start();
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
    })
    .then(() => loader.done());
};

export const createCommentPost = payload => (dispatch) => {
  loader.start();
  api.createCommentPost(payload)
    .then((data) => {
      dispatch(addPosts(data.data));
    })
    .catch((error) => {
      dispatch(addErrorNotification(parseErrors(error).general));
    })
    .then(() => loader.done());
};
