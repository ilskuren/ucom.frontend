import { USER } from 'utils/actionTypes';

const getInitialState = () => ({
  errors: {
    userSources: {
      isValid: false,
      results: [],
    },
  },
  isValid: false,
});

const user = (state = getInitialState(), action) => {
  switch (action.type) {
    case USER.SET_USER:
      return Object.assign({}, state, action.payload);

    case USER.REMOVE_USER:
      return getInitialState();

    case USER.UPLOAD_AVATAR_COMPLETED: {
      return {
        ...state,
        avatarFilename: action.payload,
      };
    }

    default:
      return state;
  }
};

export default user;
