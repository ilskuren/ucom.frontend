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

    // case USER.EDIT_CONTACTS_COMPLETED: {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // }

    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case 'USER:AVATAR_LOADING': {
      return {
        ...state,
        avatarLoading: action.payload,
      };
    }

    // case USER.EDIT_WORK_AND_EDUCATION_COMPLETED: {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // }

    // case USER.EDIT_GENERAL_INFO_COMPLETED: {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // }

    // case USER.UPLOAD_AVATAR_COMPLETED: {
    //   return {
    //     ...state,
    //     avatarFilename: action.payload,
    //   };
    // }

    default:
      return state;
  }
};

export default user;
