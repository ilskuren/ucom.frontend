import api from '../api';
import loader from '../utils/loader';
import { addPosts } from './posts';
import { addErrorNotification } from './notifications';
import { parseErrors } from '../utils/errors';

export const addOrganizations = payload => ({ type: 'ADD_ORGANIZATIONS', payload });
export const addOrganizationWallFeedPost = payload => ({ type: 'ADD_ORGANIZATION_WALL_FEED_POST', payload });

export const getOrganization = organizationId => (dispatch) => {
  loader.start();
  api.getOrganization(organizationId)
    .then((data) => {
      dispatch(addOrganizations([data]));
    })
    .catch(() => loader.done())
    .then(() => loader.done());
};

export const getOrganizationWallFeed = organizationId => (dispatch) => {
  loader.start();
  api.getOrganizationWallFeed(organizationId)
    .then((data) => {
      dispatch(addPosts(data.data));
      dispatch(addOrganizations([{
        id: organizationId,
        wallFeedIds: data.data.map(item => item.id),
      }]));
    })
    .catch(() => loader.done())
    .then(() => loader.done());
};

export const createOrganizationsCommentPost = payload => (dispatch) => {
  loader.start();
  api.createOrganizationsCommentPost(payload.organizationId, payload.data)
    .then((data) => {
      dispatch(addPosts([data]));
      dispatch(addOrganizationWallFeedPost({
        organizationId: payload.organizationId,
        postId: data.id,
      }));
    })
    .catch((error) => {
      dispatch(addErrorNotification(parseErrors(error).general));
    })
    .then(() => loader.done());
};
