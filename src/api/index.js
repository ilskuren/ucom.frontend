import config from '../../package.json';
import { convertServerUser } from './convertors';

const Eos = require('eosjs');

const { ecc } = Eos.modules;

export const login = ({ brainkey, account_name }) => {
  const ownerKey = ecc.seedPrivate(brainkey);
  const activeKey = ecc.seedPrivate(ownerKey);
  const sign = ecc.sign(account_name, activeKey);
  const publicKey = ecc.privateToPublic(activeKey);

  return fetch(`${config.backend.httpEndpoint}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sign,
      account_name,
      public_key: publicKey,
    }),
  })
    .then(resp => resp.json());
};

export const register = ({ brainkey, accountName }) => {
  const ownerKey = ecc.seedPrivate(brainkey);
  const activeKey = ecc.seedPrivate(ownerKey);
  const sign = ecc.sign(accountName, activeKey);
  const publicKey = ecc.privateToPublic(activeKey);

  return fetch(`${config.backend.httpEndpoint}/api/v1/auth/registration`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sign,
      brainkey,
      account_name: accountName,
      public_key: publicKey,
    }),
  })
    .then(resp => resp.json());
};


export const getMyself = token => (
  fetch(`${config.backend.httpEndpoint}/api/v1/myself`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(resp => resp.json())
);

export const patchMyself = (data, token) => (
  fetch(`${config.backend.httpEndpoint}/api/v1/myself`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(resp => resp.json())
);

export const patchMyselfFormData = (data, token) => (
  fetch(`${config.backend.httpEndpoint}/api/v1/myself`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  })
    .then(resp => resp.json())
);

export const getUser = id => (
  fetch(`${config.backend.httpEndpoint}/api/v1/users/${id}`)
    .then(resp => resp.json().then(data => convertServerUser(data)))
);

export const getUsers = () => (
  fetch(`${config.backend.httpEndpoint}/api/v1/users`)
    .then(resp => resp.json())
);

export const searchUsers = query => (
  fetch(`${config.backend.httpEndpoint}/api/v1/users/search/?q=${query}`)
    .then(resp => resp.json())
);

export const createPost = (data, token) => (
  fetch(`${config.backend.httpEndpoint}/api/v1/posts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  })
    .then(resp => resp.json())
);

export const updatePost = (data, token, id) => (
  fetch(`${config.backend.httpEndpoint}/api/v1/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  })
    .then(resp => resp.json())
);

export const getPost = id => (
  fetch(`${config.backend.httpEndpoint}/api/v1/posts/${id}`)
    .then(resp => resp.json())
);

export const getUserPosts = id => (
  fetch(`${config.backend.httpEndpoint}/api/v1/users/${id}/posts`)
    .then(resp => resp.json())
);

export const getPosts = () => (
  fetch(`${config.backend.httpEndpoint}/api/v1/posts`)
    .then(resp => resp.json())
);

export const postUpVote = (postId, token) => (
  fetch(`${config.backend.httpEndpoint}/api/v1/posts/${postId}/upvote`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(resp => resp.json())
);

export const checkAccountName = accountName => (
  fetch(`${config.backend.httpEndpoint}/api/v1/auth/registration/validate-account-name`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      account_name: accountName,
    }),
  })
    .then(resp => resp.json())
);

export const createOffer = (data, token) => (
  fetch(`${config.backend.httpEndpoint}/api/v1/posts/offers`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  })
    .then(resp => resp.json())
);

export const updateOffer = (data, token, id) => (
  fetch(`${config.backend.httpEndpoint}/api/v1/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  })
    .then(resp => resp.json())
);

export const follow = (userId, token) => (
  fetch(`${config.backend.httpEndpoint}/api/v1/users/${userId}/follow`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(resp => resp.json())
);

export const join = (postId, token) => (
  fetch(`${config.backend.httpEndpoint}/api/v1/posts/${postId}/join`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(resp => resp.json())
);

export const createComment = (postId, token, data) => (
  fetch(`${config.backend.httpEndpoint}/api/v1/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(resp => resp.json())
);
