import humps from 'lodash-humps';
import api from '../api';
import loader from '../utils/loader';
import { addPosts } from './posts';
import { addUsers } from './users';
import { addErrorNotification } from './notifications';
import { parseErrors } from '../utils/errors';
import { getToken } from '../utils/token';

export const addOrganizations = payload => ({ type: 'ADD_ORGANIZATIONS', payload });
export const addOrganizationFollower = payload => ({ type: 'ADD_ORGANIZATION_FOLLOWER', payload });
export const removeOrganizationFollower = payload => ({ type: 'REMOVE_ORGANIZATION_FOLLOWER', payload });
export const addOrganizationWallFeedPost = payload => ({ type: 'ADD_ORGANIZATION_WALL_FEED_POST', payload });

export const getOrganization = organizationId => (dispatch) => {
  loader.start();
  api.getOrganization(organizationId)
    .then(humps)
    .then((data) => {
      dispatch(addUsers([data.data.user].concat(data.data.followedBy, data.data.usersTeam)));
      dispatch(addOrganizations([data.data]));
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

export const followOrganization = data => (dispatch) => {
  loader.start();
  api.followOrganization(data.organization.id, getToken(), data.owner.accountName, data.organization.blockchainId)
    .then(() => {
      dispatch(addOrganizationFollower({
        organizationId: data.organization.id,
        user: data.owner,
      }));
    })
    .catch(error => dispatch(addErrorNotification(parseErrors(error).general)))
    .then(() => loader.done());
};

export const unfollowOrganization = data => (dispatch) => {
  loader.start();
  api.unfollowOrganization(data.organization.id, getToken(), data.owner.accountName, data.organization.blockchainId)
    .then(() => {
      dispatch(removeOrganizationFollower({
        organizationId: data.organization.id,
        user: data.owner,
      }));
    })
    .catch(error => dispatch(addErrorNotification(parseErrors(error).general)))
    .then(() => loader.done());
};
