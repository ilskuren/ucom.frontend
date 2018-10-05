import { uniqBy } from 'lodash';

const getInitialState = () => ({
  data: {
  },
});

const users = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_POST': {
      return getInitialState();
    }

    case 'ADD_USERS': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, action.payload
          .reduce((value, item) => ({ ...value, [item.id]: Object.assign({}, state.data[item.id], item) }), {})),
      });
    }

    case 'ADD_USER_FOLLOWER': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, Object.assign({}, state.data[action.payload.userId], {
          iFollow: uniqBy([].concat(state.data[action.payload.userId].iFollow, action.payload.user), item => item.id),
        })),
      });
    }

    case 'REMOVE_USER_FOLLOWER': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, Object.assign({}, state.data[action.payload.userId], {
          iFollow: state.data[action.payload.userId].iFollow.filter(item => item.id !== action.payload.user.id),
        })),
      });
    }

    default: {
      return state;
    }
  }
};

export const getUserById = (users, userId) => users.data[userId];

export default users;
