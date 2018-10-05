import { SETTINGS } from '../../utils/actionTypes';

const getInitialState = () => ({
  data: {
  },
  errors: {
  },
  isValid: false,
});

const referral = (state = getInitialState(), action) => {
  switch (action.type) {
    case SETTINGS.RESET_REFERRAL: {
      return getInitialState();
    }

    default: {
      return state;
    }
  }
};

export default referral;
