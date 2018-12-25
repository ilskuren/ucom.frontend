import humps from 'lodash-humps';
import api from '../api';
import loader from '../utils/loader';
import { addUsers } from './users';
import { addServerErrorNotification } from './notifications';
import { getToken } from '../utils/token';
import store from '../store';

export const addOrganizations = (organizations) => {
  store.dispatch({ type: 'ADD_ORGANIZATIONS', payload: organizations });
};

export const addOrganizationFollower = payload => ({ type: 'ADD_ORGANIZATION_FOLLOWER', payload });
export const removeOrganizationFollower = payload => ({ type: 'REMOVE_ORGANIZATION_FOLLOWER', payload });

export const getOrganization = organizationId => () => {
  loader.start();
  api.getOrganization(organizationId)
    .then(humps)
    .then((data) => {
      addUsers([data.data.user].concat(data.data.followedBy, data.data.usersTeam));
      addOrganizations([data.data]);
    })
    .catch(() => loader.done())
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
    .catch(error => dispatch(addServerErrorNotification(error)))
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
    .catch(error => dispatch(addServerErrorNotification(error)))
    .then(() => loader.done());
};
