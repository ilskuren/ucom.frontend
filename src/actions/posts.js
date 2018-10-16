import humps from 'lodash-humps';
import api from '../api';
import { addUsers } from './users';
import { UPVOTE_STATUS, DOWNVOTE_STATUS } from '../utils/posts';
import { parseErrors } from '../utils/errors';
import { addErrorNotification } from './notifications';
import { addComments } from './comments';
import { addFeedPosts } from './feeds';
import { USER_FEED_TYPE_ID, USER_NEWS_FEED_TYPE_ID, ORGANIZATION_FEED_TYPE_ID } from '../store/feeds';
import loader from '../utils/loader';

export const addPosts = payload => ({ type: 'ADD_POSTS', payload });
export const setPostVote = payload => ({ type: 'SET_POST_VOTE', payload });
export const setPostCommentCount = payload => ({ type: 'SET_POST_COMMENT_COUNT', payload });

export const fetchPost = postId => (dispatch) => {
  loader.start();
  api.getPost(postId)
    .then(humps)
    .then((data) => {
      dispatch(addComments(humps(data.comments)));
      dispatch(addPosts([data]));
      dispatch(addUsers([data.user]));
    })
    .catch(() => loader.done())
    .then(() => loader.done());
};

export const updatePost = payload => (dispatch) => {
  loader.start();
  api.updatePost(payload.data, payload.postId)
    .then((data) => {
      dispatch(addPosts([data]));
    })
    .catch((error) => {
      dispatch(addErrorNotification(parseErrors(error).general));
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
    .catch(() => loader.done())
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

export const createUserCommentPost = payload => (dispatch) => {
  loader.start();
  api.createUserCommentPost(payload.userId, payload.data)
    .then((data) => {
      dispatch(addPosts([data]));
      dispatch(addFeedPosts({
        feedTypeId: USER_FEED_TYPE_ID,
        userId: payload.userId,
        postsIds: [data.id],
      }));
    })
    .catch((error) => {
      dispatch(addErrorNotification(parseErrors(error).general));
    })
    .then(() => loader.done());
};

export const createSelfCommentPost = payload => (dispatch) => {
  loader.start();
  api.createUserCommentPost(payload.userId, payload.data)
    .then((data) => {
      dispatch(addPosts([data]));
      dispatch(addFeedPosts({
        feedTypeId: USER_FEED_TYPE_ID,
        userId: payload.userId,
        postsIds: [data.id],
      }));
      dispatch(addFeedPosts({
        feedTypeId: USER_NEWS_FEED_TYPE_ID,
        userId: payload.userId,
        postsIds: [data.id],
      }));
    })
    .catch((error) => {
      dispatch(addErrorNotification(parseErrors(error).general));
    })
    .then(() => loader.done());
};

export const createOrganizationsCommentPost = payload => (dispatch) => {
  loader.start();
  api.createOrganizationsCommentPost(payload.organizationId, payload.data)
    .then((data) => {
      dispatch(addPosts([data]));
      dispatch(addFeedPosts({
        feedTypeId: ORGANIZATION_FEED_TYPE_ID,
        organizationId: payload.organizationId,
        postsIds: [data.id],
      }));
    })
    .catch((error) => {
      dispatch(addErrorNotification(parseErrors(error).general));
    })
    .then(() => loader.done());
};
