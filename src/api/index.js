import humps from 'lodash-humps';
import param from 'jquery-param';
import { bind } from 'decko';
import HttpActions from './HttpActions';
import { getToken } from '../utils/token';
import { convertServerUser, convertServerUserLogin } from './convertors';
import { getActivePrivateKey } from '../utils/keys';
import { getBrainkey } from '../utils/brainkey';
import { getBackendConfig } from '../utils/config';

const AppTransaction = require('uos-app-transaction');

const { TransactionFactory } = AppTransaction;

if (process.env.NODE_ENV === 'production') {
  TransactionFactory.initForProductionEnv();
} else {
  TransactionFactory.initForStagingEnv();
}

const Eos = require('eosjs');

const { ecc } = Eos.modules;

class Api {
  constructor() {
    this.actions = new HttpActions(getBackendConfig().httpEndpoint);
  }

  getPrivateHeaders() {
    return { Authorization: `Bearer ${getToken()}` };
  }

  @bind
  async login({ brainkey, account_name }) {
    const ownerKey = ecc.seedPrivate(brainkey);
    const activeKey = ecc.seedPrivate(ownerKey);
    const sign = ecc.sign(account_name, activeKey);
    const publicKey = ecc.privateToPublic(activeKey);
    const response = await this.actions.post('/api/v1/auth/login', {
      sign,
      account_name,
      public_key: publicKey,
    });
    return convertServerUserLogin(response.data);
  }

  @bind
  async register({ brainkey, accountName, isTrackingAllowed }) {
    const ownerKey = ecc.seedPrivate(brainkey);
    const activeKey = ecc.seedPrivate(ownerKey);
    const sign = ecc.sign(accountName, activeKey);
    const publicKey = ecc.privateToPublic(activeKey);
    const response = await this.actions.post('/api/v1/auth/registration', {
      sign,
      brainkey,
      is_tracking_allowed: isTrackingAllowed,
      account_name: accountName,
      public_key: publicKey,
    });

    return humps(response.data);
  }

  @bind
  async getMyself() {
    const response = await this.actions.get('/api/v1/myself');

    return humps(response.data);
  }

  @bind
  async patchMyself(data) {
    const response = await this.actions.patch('/api/v1/myself', data);

    return convertServerUser(response.data);
  }

  @bind
  async getUser(id) {
    const response = await this.actions.get(`/api/v1/users/${id}`);

    return humps(response.data);
  }

  @bind
  async getUsers() {
    const response = await this.actions.get('/api/v1/users');

    return humps(response.data);
  }

  @bind
  async getOrganizations(params) {
    const response = await this.actions.get(`/api/v1/organizations?${param(params)}`);

    return humps(response.data);
  }

  @bind
  async searchUsers(query) {
    const response = await this.actions.get(`/api/v1/users/search/?q=${query}`);

    return humps(response.data);
  }

  @bind
  async createPost(data) {
    const response = await this.actions.post('/api/v1/posts', data);

    return response.data;
  }

  @bind
  async repostPost(postId) {
    const response = await this.actions.post(`/api/v1/posts/${postId}/repost`);

    return response.data;
  }

  @bind
  async updatePost(data, id) {
    const response = await this.actions.patch(`/api/v1/posts/${id}`, data);

    return response.data;
  }

  @bind
  async getPost(id) {
    const response = await this.actions.get(`/api/v1/posts/${id}`);

    return response.data;
  }

  @bind
  async getUserPosts(id) {
    const response = await this.actions.get(`/api/v1/users/${id}/posts`);

    return humps(response.data);
  }

  @bind
  async getPosts(params) {
    const response = await this.actions.get(`/api/v1/posts?${param(params)}`);

    return humps(response.data);
  }

  @bind
  async vote(isUp, postId, commentId) {
    let url = `/api/v1/posts/${postId}`;

    if (commentId) {
      url = `${url}/comments/${commentId}`;
    }

    url = `${url}/${isUp ? 'upvote' : 'downvote'}`;

    const response = await this.actions.post(url);

    return response.data;
  }

  @bind
  async checkAccountName(accountName) {
    const response = await this.actions.post('/api/v1/auth/registration/validate-account-name', {
      account_name: accountName,
    });

    return humps(response.data);
  }

  @bind
  async follow(userId, token, senderAccountName, recipientAccountName) {
    const brainkey = getBrainkey();
    const senderActivePrivateKey = getActivePrivateKey(brainkey);
    const signedTransaction = await TransactionFactory.getSignedUserFollowsUser(
      senderAccountName,
      senderActivePrivateKey,
      recipientAccountName,
      true,
    );

    const response = await this.actions.post(`/api/v1/users/${userId}/follow`, {
      signed_transaction: signedTransaction,
    });

    return response;
  }

  @bind
  async unfollow(userId, token, senderAccountName, recipientAccountName) {
    const brainkey = getBrainkey();
    const senderActivePrivateKey = getActivePrivateKey(brainkey);
    const signedTransaction = await TransactionFactory.getSignedUserUnfollowsUser(
      senderAccountName,
      senderActivePrivateKey,
      recipientAccountName,
      true,
    );

    const response = await this.actions.post(`/api/v1/users/${userId}/unfollow`, {
      signed_transaction: signedTransaction,
    });

    return humps(response.data);
  }

  @bind
  async followOrganization(id, token, senderAccountName, recipientAccountName) {
    const brainkey = getBrainkey();
    const senderActivePrivateKey = getActivePrivateKey(brainkey);
    const signedTransaction = await TransactionFactory.getSignedUserFollowsOrg(
      senderAccountName,
      senderActivePrivateKey,
      recipientAccountName,
    );

    const response = await this.actions.post(`/api/v1/organizations/${id}/follow`, {
      signed_transaction: signedTransaction,
    });

    return humps(response.data);
  }

  @bind
  async unfollowOrganization(id, token, senderAccountName, recipientAccountName) {
    const brainkey = getBrainkey();
    const senderActivePrivateKey = getActivePrivateKey(brainkey);
    const signedTransaction = await TransactionFactory.getSignedUserUnfollowsOrg(
      senderAccountName,
      senderActivePrivateKey,
      recipientAccountName,
    );
    const response = await this.actions.post(`/api/v1/organizations/${id}/unfollow`, {
      signed_transaction: signedTransaction,
    });

    return humps(response.data);
  }

  @bind
  async join(userId) {
    const response = await this.actions.post(`/api/v1/posts/${userId}/join`);

    return humps(response.data);
  }

  @bind
  async createComment(data, postId, commentId) {
    let url = `/api/v1/posts/${postId}/comments`;

    if (commentId) {
      url = `${url}/${commentId}/comments`;
    }

    const response = await this.actions.post(url, data);

    return humps(response.data);
  }

  @bind
  async createOrganization(data) {
    const url = '/api/v1/organizations';
    const response = await this.actions.post(url, data);

    return response.data;
  }

  @bind
  async updateOrganization(data) {
    const response = await this.actions.patch(`/api/v1/organizations/${data.id}`, data);

    return response.data;
  }

  @bind
  async getOrganization(id) {
    const url = `/api/v1/organizations/${id}`;

    const response = await this.actions.get(url);

    return response.data;
  }

  @bind
  async getOrganizationPosts(id) {
    const url = `/api/v1/organizations/${id}/posts`;

    const response = await this.actions.get(url);

    return humps(response.data);
  }

  @bind
  async getOrganizationWallFeed(id, perPage, page) {
    const url = `/api/v1/organizations/${id}/wall-feed?per_page=${perPage}&page=${page}`;

    const response = await this.actions.get(url);

    return humps(response.data);
  }

  @bind
  async searchCommunity(q) {
    const url = `/api/v1/community/search?q=${q}`;

    const response = await this.actions.get(url);

    return humps(response.data);
  }

  @bind
  async searchPartnership(q) {
    const url = `/api/v1/partnership/search?q=${q}`;

    const response = await this.actions.get(url);

    return humps(response.data);
  }

  @bind
  async createUserCommentPost(userId, data) {
    const url = `/api/v1/users/${userId}/posts`;
    const response = await this.actions.post(url, data);

    return humps(response.data);
  }

  @bind
  async updateUserCommentPost(userId, postId, data) {
    const url = `/api/v1/users/${userId}/posts/${postId}`;
    const response = await this.actions.patch(url, data);

    return humps(response.data);
  }

  @bind
  async createOrganizationsCommentPost(orgId, data) {
    const url = `/api/v1/organizations/${orgId}/posts`;
    const response = await this.actions.post(url, data);

    return humps(response.data);
  }

  @bind
  async updateOrganizationsCommentPost(orgId, postId, data) {
    const url = `/api/v1/organizations/${orgId}/posts/${postId}`;
    const response = await this.actions.path(url, data);

    return humps(response.data);
  }

  @bind
  async getUserWallFeed(userId, perPage, page) {
    const response = await this.actions.get(`/api/v1/users/${userId}/wall-feed?per_page=${perPage}&page=${page}`);

    return humps(response.data);
  }

  @bind
  async getUserNewsFeed(perPage, page) {
    const response = await this.actions.get(`/api/v1/myself/news-feed?per_page=${perPage}&page=${page}`);

    return humps(response.data);
  }

  @bind
  async getNotifications(perPage, page) {
    const response = await this.actions.get(`/api/v1/myself/notifications?per_page=${perPage}&page=${page}`);

    return humps(response.data);
  }

  @bind
  async confirmNotification(id) {
    const response = await this.actions.post(`/api/v1/myself/notifications/${id}/confirm`);

    return humps(response.data);
  }


  @bind
  async declineNotification(id) {
    const response = await this.actions.post(`/api/v1/myself/notifications/${id}/decline`);

    return humps(response.data);
  }

  @bind
  async seenNotification(id) {
    const response = await this.actions.post(`/api/v1/myself/notifications/${id}/seen`);

    return humps(response.data);
  }
}

export default new Api();
