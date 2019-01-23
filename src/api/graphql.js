import { GraphQLSchema } from 'ucom-libs-graphql-schemas';
import humps from 'lodash-humps';
import * as axios from 'axios';
import { getBackendConfig } from '../utils/config';
import { getToken } from '../utils/token';
import { COMMENTS_PER_PAGE } from '../utils/comments';
import { FEED_PER_PAGE } from '../utils/feed';

const request = (data) => {
  const options = {
    baseURL: getBackendConfig().httpEndpoint,
    headers: {},
  };

  const token = getToken();

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return axios.post('/graphql', data, options);
};

export default {
  getUserWallFeed({
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

    return request({ query })
      .then((resp) => {
        const data = humps(resp.data);
        return data.data.userWallFeed;
      });
  },

  getFeedComments({
    commentableId,
    page,
    perPage,
  }) {
    const query = GraphQLSchema.getPostCommentsQuery(
      commentableId,
      page || 1,
      perPage || COMMENTS_PER_PAGE,
    );

    return request({ query })
      .then((resp) => {
        const data = humps(resp.data);
        return data.data.feedComments;
      });
  },

  getCommentsOnComment({
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

    return request({ query })
      .then((resp) => {
        const data = humps(resp.data);
        return data.data.commentsOnComment;
      });
  },
};
