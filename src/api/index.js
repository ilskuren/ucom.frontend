import humps from 'lodash-humps';
import param from 'jquery-param';
import { bind } from 'decko';
import HttpActions from './HttpActions';
import packageConfig from '../../package.json';
import { getToken } from '../utils/token';
import { convertServerUser, convertServerUserLogin } from './convertors';
// import { getActivePrivateKey } from '../utils/keys';
// import { getBrainkey } from '../utils/brainkey';

const AppTransaction = require('uos-app-transaction');

const { TransactionFactory } = AppTransaction;

TransactionFactory.initForProductionEnv();

const Eos = require('eosjs');

const { ecc } = Eos.modules;

class Api {
  constructor() {
    this.actions = new HttpActions(packageConfig.backend.httpEndpoint);
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
  async register({ brainkey, accountName }) {
    const ownerKey = ecc.seedPrivate(brainkey);
    const activeKey = ecc.seedPrivate(ownerKey);
    const sign = ecc.sign(accountName, activeKey);
    const publicKey = ecc.privateToPublic(activeKey);
    const response = await this.actions.post('/api/v1/auth/registration', {
      sign,
      brainkey,
      account_name: accountName,
      public_key: publicKey,
    });
    return convertServerUserLogin(response.data);
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
  async patchMyselfFormData(data) {
    const response = await this.actions.patch('/api/v1/myself', data);

    return convertServerUser(response.data);
  }

  @bind
  async getUser(id) {
    const response = await this.actions.get(`/api/v1/users/${id}`);

    return convertServerUser(response.data);
  }

  @bind
  async getUsers() {
    const response = await this.actions.get('/api/v1/users');

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

  // @bind
  // async follow(userId, token, senderAccountName, recipientAccountName) {
  //   const brainkey = getBrainkey();
  //   const senderActivePrivateKey = getActivePrivateKey(brainkey);

  //   const signed = await TransactionFactory.getSignedUserFollowsUser(
  //     senderAccountName,
  //     senderActivePrivateKey,
  //     recipientAccountName,
  //   );
  //   const response = await this.actions.post(`/api/v1/users/${userId}/follow`, signed, { headers: this.getPrivateHeaders() });
  //   return response;
  // }

  @bind
  async follow(userId) {
    const response = await this.actions.post(`/api/v1/users/${userId}/follow`);

    return humps(response.data);
  }

  @bind
  async unfollow(userId) {
    const response = await this.actions.post(`/api/v1/users/${userId}/unfollow`);

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
  async getOrganization(id) {
    const url = `/api/v1/organizations/${id}`;

    const response = await this.actions.get(url);

    return response.data;
  }
}

export default new Api();
