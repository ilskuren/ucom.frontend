import { GraphQLSchema } from 'ucom-libs-graphql-schemas';
import humps from 'lodash-humps';
import * as axios from 'axios';
import { getBackendConfig } from '../utils/config';
import { getToken } from '../utils/token';
import { COMMENTS_PER_PAGE } from '../utils/comments';
import { FEED_PER_PAGE } from '../utils/feed';

const request = async (data) => {
  const options = {
    baseURL: getBackendConfig().httpEndpoint,
    headers: {},
  };

  const token = getToken();

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const resp = await axios.post('/graphql', data, options);
    return humps(resp.data);
  } catch (e) {
    throw e;
  }
};

export default {
  async getUserWallFeed({
    userId,
    page,
    perPage,
    commentsPage,
    commentsPerPage,
  }) {
    const query = GraphQLSchema.getUserWallFeedQuery(
      userId,
      page || 1,
      perPage || FEED_PER_PAGE,
      commentsPage || 1,
      commentsPerPage || COMMENTS_PER_PAGE,
    );

    try {
      const data = await request({ query });
      return data.data.userWallFeed;
    } catch (e) {
      throw e;
    }
  },

  async getUserNewsFeed({
    page,
    perPage,
    commentsPage,
    commentsPerPage,
  }) {
    const query = GraphQLSchema.getUserWallFeedQuery(
      page || 1,
      perPage || FEED_PER_PAGE,
      commentsPage || 1,
      commentsPerPage || COMMENTS_PER_PAGE,
    );

    try {
      const data = await request({ query });
      return data.data.userNewsFeed;
    } catch (e) {
      throw e;
    }
  },

  async getOrganizationWallFeed({
    organizationId,
    page,
    perPage,
    commentsPage,
    commentsPerPage,
  }) {
    const query = GraphQLSchema.getOrganizationWallFeedQuery(
      organizationId,
      page || 1,
      perPage || FEED_PER_PAGE,
      commentsPage || 1,
      commentsPerPage || COMMENTS_PER_PAGE,
    );

    try {
      const data = await request({ query });
      return data.data.orgWallFeed;
    } catch (e) {
      throw e;
    }
  },

  async getPostComments({
    commentableId,
    page,
    perPage,
  }) {
    const query = GraphQLSchema.getPostCommentsQuery(
      commentableId,
      page || 1,
      perPage || COMMENTS_PER_PAGE,
    );

    try {
      const data = await request({ query });
      return data.data.feedComments;
    } catch (e) {
      throw e;
    }
  },

  async getCommentsOnComment({
    commentableId,
    parentId,
    parentDepth,
    page,
    perPage,
  }) {
    const query = GraphQLSchema.getCommentsOnCommentQuery(
      commentableId,
      parentId,
      parentDepth,
      page || 1,
      perPage || COMMENTS_PER_PAGE,
    );

    try {
      const data = await request({ query });
      return data.data.commentsOnComment;
    } catch (e) {
      throw e;
    }
  },

  async getOnePost({
    postId,
    page = 1,
    perPage = COMMENTS_PER_PAGE,
  }) {
    const token = getToken();
    const query = (token ? GraphQLSchema.getOnePostQueryAsMyself : GraphQLSchema.getOnePostQueryAsGuest)(
      postId,
      page,
      perPage,
    );

    try {
      const data = await request({ query });
      return data.data.onePost;
    } catch (e) {
      throw e;
    }
  },
};
