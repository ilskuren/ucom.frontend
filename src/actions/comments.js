import api from '../api';
import { UPVOTE_STATUS, DOWNVOTE_STATUS } from '../utils/posts';
import loader from '../utils/loader';
import { addServerErrorNotification } from './notifications';
import { postsAddComments, postsAddSingleComment } from './posts';
import graphql from '../api/graphql';

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

export const createComment = ({
  data,
  postId,
  commentId,
}) => async (dispatch) => {
  loader.start();

  try {
    const commentData = await api.createComment(data, postId, commentId);
    dispatch(addComments([commentData]));
    dispatch(postsAddSingleComment({
      postId,
      commentId: commentData.id,
    }));
  } catch (e) {
    console.error(e);
    dispatch(addServerErrorNotification(e));
  }

  loader.done();
};

export const getPostComments = ({
  postId,
  page,
  perPage,
}) => async (dispatch) => {
  loader.start();

  try {
    const data = await graphql.getFeedComments({
      page,
      perPage,
      commentableId: postId,
    });

    dispatch(postsAddComments({
      postId,
      parentId: 0,
      metadata: data.metadata,
      data: data.data,
    }));
  } catch (e) {
    console.error(e);
  }

  loader.done();
};

export const getCommentsOnComment = ({
  postId,
  parentId,
  parentDepth,
  page,
  perPage,
}) => async (dispatch) => {
  loader.start();

  try {
    const data = await graphql.getCommentsOnComment({
      commentableId: postId,
      parentId,
      parentDepth,
      page,
      perPage,
    });

    dispatch(postsAddComments({
      postId,
      parentId,
      metadata: data.metadata,
      data: data.data,
    }));
  } catch (e) {
    console.error(e);
  }

  loader.done();
};
