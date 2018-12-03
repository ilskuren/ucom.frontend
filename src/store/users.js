import { compact, uniq } from 'lodash';

const getInitialState = () => ({
  data: {},
});

const users = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_POST':
      return getInitialState();

    case 'ADD_USERS': {
      const users = action.payload.filter(i => i.id);

      if (!users.length) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          ...users.reduce((result, user) => ({ ...result, [user.id]: { ...state.data[user.id], ...user } }), {}),
        },
      };
    }

    case 'USERS_ADD_I_FOLLOW': {
      const user = state.data[action.payload.ownerId];

      if (!user) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          [user.id]: {
            ...user,
            iFollow: uniq(compact([].concat(user.iFollow, action.payload.userId))),
          },
        },
      };
    }

    case 'USERS_REMOVE_I_FOLLOW': {
      const user = state.data[action.payload.ownerId];

      if (!user || !user.iFollow) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          [user.id]: {
            ...user,
            iFollow: user.iFollow.filter(id => id !== action.payload.userId),
          },
        },
      };
    }

    case 'USERS_ADD_FOLLOWED_BY': {
      const user = state.data[action.payload.ownerId];

      if (!user) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          [user.id]: {
            ...user,
            followedBy: uniq(compact([].concat(user.followedBy, action.payload.userId))),
          },
        },
      };
    }

    case 'USERS_REMOVE_FOLLOWED_BY': {
      const user = state.data[action.payload.ownerId];

      if (!user || !user.followedBy) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          [user.id]: {
            ...user,
            followedBy: user.followedBy.filter(id => id !== action.payload.userId),
          },
        },
      };
    }

    default:
      return state;
  }
};

export const getUserById = (users, userId) => users.data[userId];

export const getUsersByIds = (users, ids = []) => ids
  .map(id => getUserById(users, id))
  .filter(user => Boolean(user));

export default users;
