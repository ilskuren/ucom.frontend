
const getInitialState = () => ({
  data: {
  },
  errors: {
  },
  isValid: false,
});

const referral = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_SETTINGS_REFERRAL': {
      return getInitialState();
    }

    default: {
      return state;
    }
  }
};

export default referral;
