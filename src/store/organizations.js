import { uniqBy, uniq } from 'lodash';

const getInitialState = () => ({
  data: {},
});

const organizations = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_POST': {
      return getInitialState();
    }

    case 'ADD_ORGANIZATIONS': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, action.payload
          .reduce((value, item) => ({ ...value, [item.id]: Object.assign({}, state.data[item.id], item) }), {})),
      });
    }

    case 'ADD_ORGANIZATION_FOLLOWER': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          [action.payload.organizationId]: Object.assign({}, state.data[action.payload.organizationId], {
            followedBy: uniqBy([].concat(
              state.data[action.payload.organizationId].followedBy,
              action.payload.organization,
            ), item => item.id),
          }),
        }),
      });
    }

    case 'REMOVE_ORGANIZATION_FOLLOWER': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          [action.payload.organizationId]: Object.assign({}, state.data[action.payload.organizationId], {
            followedBy: state.data[action.payload.organizationId].followedBy.filter(item => item.id !== action.payload.user.id),
          }),
        }),
      });
    }

    case 'ADD_ORGANIZATION_WALL_FEED_POST': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          [action.payload.organizationId]: Object.assign({}, state.data[action.payload.organizationId], {
            wallFeedIds: uniq(state.data[action.payload.organizationId].wallFeedIds ?
              state.data[action.payload.organizationId].wallFeedIds.concat(action.payload.postId) :
              [action.payload.postId]),
          }),
        }),
      });
    }

    default: {
      return state;
    }
  }
};

export const getOrganizationById = (organizations, organizationId) =>
  organizations.data[organizationId];

export default organizations;
