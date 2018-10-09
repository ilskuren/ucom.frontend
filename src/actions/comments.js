import humps from 'lodash-humps';
import api from '../api';
import { UPVOTE_STATUS, DOWNVOTE_STATUS } from '../utils/posts';
import { addErrorNotification } from './notifications';
import { parseErrors } from '../utils/errors';
import { fetchPost } from './posts';

export const addComments = payload => ({ type: 'ADD_COMMENTS', payload });
export const setCommentVote = payload => ({ type: 'SET_COMMENT_VOTE', payload });

export const commentVote = payload => (dispatch) => {
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
    });
};

export const createComment = payload => (dispatch) => {
  api.createComment(payload.data, payload.postId, payload.commentId)
    .then((data) => {
      dispatch(addComments([data]));
      dispatch(fetchPost(payload.postId));
    })
    .catch((error) => {
      dispatch(addErrorNotification(parseErrors(error).general));
    });
};
