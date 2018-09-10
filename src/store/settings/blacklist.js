const getInitialState = () => ({
  data: {
  },
  errors: {
  },
  isValid: false,
});

const blacklist = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_SETTINGS_BLACKLIST': {
      return getInitialState();
    }

    default: {
      return state;
    }
  }
};

export default blacklist;
