import humps from 'lodash-humps';
import api from '../api';
import { addUsers } from './users';
import { addOrganizations } from './organizations';
import { UPVOTE_STATUS, DOWNVOTE_STATUS } from '../utils/posts';
import { addServerErrorNotification } from './notifications';
import { addComments } from './comments';
import snakes from '../utils/snakes';
import loader from '../utils/loader';

export const setPostVote = payload => ({ type: 'SET_POST_VOTE', payload });
export const setPostCommentCount = payload => ({ type: 'SET_POST_COMMENT_COUNT', payload });

export const addPosts = (payload = []) => (dispatch) => {
  const posts = [];
  const users = [];
  const organizations = [];

  const parsePost = (post) => {
    posts.push(post);

    if (post.user) {
      users.push(post.user);
    }

    if (post.organization) {
      organizations.concat(post.organization);
    }

    if (post.post) {
      parsePost(post.post);
    }
  };

  payload.forEach(parsePost);
  dispatch(addUsers(users));
  dispatch(addOrganizations(organizations));
  dispatch({ type: 'ADD_POSTS', payload: posts });
};

export const fetchPost = postId => async (dispatch) => {
  loader.start();

  try {
    const data = humps(await api.getPost(postId));

    dispatch(addComments(humps(data.comments)));
    dispatch(addPosts([data]));
  } catch (e) {
    console.error(e);
  }

  loader.done();
};

export const updatePost = payload => (dispatch) => {
  loader.start();
  api.updatePost(snakes(payload.data), payload.postId)
    .then((data) => {
      dispatch(addPosts([data]));
    })
    .catch((error) => {
      dispatch(addServerErrorNotification(error));
    })
    .then(() => loader.done());
};

export const addRepost = postId => (dispatch) => {
  loader.start();
  api.repostPost(postId)
    .catch((error) => {
      dispatch(addServerErrorNotification(error));
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
      dispatch(addServerErrorNotification(error));
    })
    .then(() => loader.done());
};
