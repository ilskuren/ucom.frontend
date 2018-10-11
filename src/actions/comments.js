import humps from 'lodash-humps';
import api from '../api';
import { UPVOTE_STATUS, DOWNVOTE_STATUS } from '../utils/posts';
import { addErrorNotification } from './notifications';
import { parseErrors } from '../utils/errors';
import loader from '../utils/loader';

export const addComments = payload => ({ type: 'ADD_COMMENTS', payload });
export const setCommentVote = payload => ({ type: 'SET_COMMENT_VOTE', payload });

export const commentVote = payload => (dispatch) => {
  loader.start();
  api.vote(payload.isUp, payload.postId, payload.commentId)
    .then(humps)
    .then((data) => {
      dispatch(setCommentVote({
        id: payload.commentId,
        currentVote: data.currentVote,
        myselfVote: payload.isUp ? UPVOTE_STATUS : DOWNVOTE_STATUS,
      }));
    })
    .catch((error) => {
      dispatch(addErrorNotification(parseErrors(error).general));
    })
    .then(() => loader.done());
};

export const createComment = payload => (dispatch) => {
  loader.start();
  api.createComment(payload.data, payload.postId, payload.commentId)
    .then((data) => {
      dispatch(addComments([data]));
    })
    .catch((error) => {
      dispatch(addErrorNotification(parseErrors(error).general));
    })
    .then(() => loader.done());
};
