import api from '../api';
import { UPVOTE_STATUS, DOWNVOTE_STATUS } from '../utils/posts';
import loader from '../utils/loader';
import { addServerErrorNotification } from './notifications';

export const addComments = payload => ({ type: 'ADD_COMMENTS', payload });
export const setCommentVote = payload => ({ type: 'SET_COMMENT_VOTE', payload });

export const commentVote = ({
  isUp,
  postId,
  commentId,
}) => async (dispatch) => {
  loader.start();

  try {
    const data = await api.vote(isUp, postId, commentId);
    dispatch(setCommentVote({
      id: commentId,
      currentVote: data.currentVote,
      myselfVote: isUp ? UPVOTE_STATUS : DOWNVOTE_STATUS,
    }));
  } catch (e) {
    console.error(e);
    dispatch(addServerErrorNotification(e));
  }

  loader.done();
};
