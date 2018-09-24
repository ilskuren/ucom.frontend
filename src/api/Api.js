import humps from 'lodash-humps';
import param from 'jquery-param';
import { bind } from 'decko';
import HttpActions from './HttpActions';
import packageConfig from '../../package.json';
import { getToken } from '../utils/token';
import { convertServerUser, convertServerUserLogin } from './convertors';

const AppTransaction = require('uos-app-transaction');

const { TransactionFactory } = AppTransaction;

TransactionFactory.initForProductionEnv();

const Eos = require('eosjs');

const { ecc } = Eos.modules;

class Api {
  constructor() {
    this.actions = new HttpActions(packageConfig.backend.httpEndpoint);
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  getPrivateHeaders() {
    return { Authorization: `Bearer ${getToken()}` };
  }

  async login({ brainkey, account_name }) {
    const ownerKey = ecc.seedPrivate(brainkey);
    const activeKey = ecc.seedPrivate(ownerKey);
    const sign = ecc.sign(account_name, activeKey);
    const publicKey = ecc.privateToPublic(activeKey);
    const response = await this.actions.post('/api/v1/auth/login', {
      sign,
      account_name,
      public_key: publicKey,
    }, {
      headers: this.headers,
    });
    return convertServerUserLogin(response.data);
  }

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
    }, {
      headers: this.headers,
    });
    return convertServerUserLogin(response.data);
  }

  async getMyself() {
    const response = await this.actions.get('/api/v1/myself', {}, { headers: this.getPrivateHeaders() });
    return convertServerUser(response.data);
  }

  async patchMyself(data) {
    const response = await this.actions.patch('/api/v1/myself', data, { headers: { ...this.headers, ...this.getPrivateHeaders() } });
    return convertServerUser(response.data);
  }

  async patchMyselfFormData(data) {
    const response = await this.actions.patch('/api/v1/myself', data, { headers: { ...this.headers, ...this.getPrivateHeaders() } });
    return convertServerUser(response.data);
  }

  async getUser(id) {
    const response = await this.actions.get(`/api/v1/users/${id}`);
    return convertServerUser(response.data);
  }

  async getUsers() {
    const response = await this.actions.get('/api/v1/users');
    return humps(response.data);
  }

  async searchUsers(query) {
    const response = await this.actions.get(`/api/v1/users/search/?q=${query}`);
    return humps(response.data);
  }

  async createPost(data) {
    const response = await this.actions.post('/api/v1/posts', data, { headers: this.getPrivateHeaders() });
    return response.data;
  }

  async updatePost(data, id) {
    const response = await this.actions.patch(`/api/v1/posts/${id}`, data, { headers: this.getPrivateHeaders() });
    return response.data;
  }

  async getPost(id) {
    const response = await this.actions.get(`/api/v1/posts/${id}`, {}, { headers: this.getPrivateHeaders() });
    return response.data;
  }

  async getUserPosts(id) {
    const response = await this.actions.get(`/api/v1/users/${id}/posts`);
    return humps(response.data);
  }

  async getPosts(params) {
    const response = await this.actions.get(`/api/v1/posts?${param(params)}`);
    return humps(response.data);
  }

  async vote(isUp, postId, commentId) {
    let url = `/api/v1/posts/${postId}`;

    if (commentId) {
      url = `${url}/comments/${commentId}`;
    }

    url = `${url}/${isUp ? 'upvote' : 'downvote'}`;

    const response = await this.actions.post(url, {}, { headers: this.getPrivateHeaders() });
    return humps(response.data);
  }

  async checkAccountName(accountName) {
    const response = await this.actions.post('/api/v1/auth/registration/validate-account-name', {
      account_name: accountName,
    }, { headers: this.headers });
    return humps(response.data);
  }

  @bind
  async follow(userId) {
    const response = await this.actions.post(`/api/v1/users/${userId}/follow`, {}, { headers: this.getPrivateHeaders() });
    return humps(response.data);
  }

  @bind
  async unfollow(userId) {
    const response = await this.actions.post(`/api/v1/users/${userId}/unfollow`, {}, { headers: this.getPrivateHeaders() });
    return humps(response.data);
  }

  async join(userId) {
    const response = await this.actions.post(`/api/v1/posts/${userId}/join`, {}, { headers: this.getPrivateHeaders() });
    return humps(response.data);
  }

  async createComment(data, postId, commentId) {
    let url = `/api/v1/posts/${postId}/comments`;

    if (commentId) {
      url = `${url}/${commentId}/comments`;
    }
    const response = await this.actions.post(url, data, { headers: { ...this.headers, ...this.getPrivateHeaders() } });
    return humps(response.data);
  }
}

export default new Api();
