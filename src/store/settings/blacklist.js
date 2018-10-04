import { SETTINGS } from '../../utils/actionTypes';

const getInitialState = () => ({
  data: {
  },
  errors: {
  },
  isValid: false,
});

const blacklist = (state = getInitialState(), action) => {
  switch (action.type) {
    case SETTINGS.RESET_BLACKLIST: {
      return getInitialState();
    }

    default: {
      return state;
    }
  }
};

export default blacklist;
