import humps from 'lodash-humps';
import api from '../api';
import { UPVOTE_STATUS, DOWNVOTE_STATUS } from '../utils/posts';
import loader from '../utils/loader';
import { addServerErrorNotification } from './notifications';
import { setPostCommentCount } from './posts';

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
      dispatch(addServerErrorNotification(error));
    })
    .then(() => loader.done());
};

export const createComment = payload => (dispatch) => {
  loader.start();
  api.createComment(payload.data, payload.postId, payload.commentId)
    .then((data) => {
      dispatch(addComments([data]));
      dispatch(setPostCommentCount({
        postId: payload.postId,
        commentsCount: (payload.commentsCount || 0) + 1,
      }));
    })
    .catch((error) => {
      dispatch(addServerErrorNotification(error));
    })
    .then(() => loader.done());
};
