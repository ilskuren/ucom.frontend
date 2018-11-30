import { uniqBy, compact } from 'lodash';

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

    case 'ADD_USER_I_FOLLOW': {
      const user = state.data[action.payload.userId];

      if (!user) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          [user.id]: {
            ...user,
            iFollow: uniqBy([].concat(user.iFollow, action.payload.user), i => i.id),
          },
        },
      };
    }

    case 'REMOVE_USER_I_FOLLOW': {
      const user = state.data[action.payload.userId];

      if (!user || !user.iFollow) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          [user.id]: {
            ...user,
            iFollow: user.iFollow.filter(i => i.id !== action.payload.user.id),
          },
        },
      };
    }

    case 'ADD_USER_FOLLOWED_BY': {
      const user = state.data[action.payload.userId];

      if (!user) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          [user.id]: {
            ...user,
            followedBy: uniqBy(compact([].concat(user.followedBy, action.payload.user)), item => item.id),
          },
        },
      };
    }

    case 'REMOVE_USER_FOLLOWED_BY': {
      const user = state.data[action.payload.userId];

      if (!user || !user.followedBy) {
        return state;
      }

      return {
        ...state,
        data: {
          [action.payload.userId]: {
            ...user,
            followedBy: user.followedBy.filter(i => i.id !== action.payload.user.id),
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};

export const getUserById = (users, userId) => users.data[userId];

export default users;
