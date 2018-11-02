const getInitialState = () => ({
  data: {},
});

const wallet = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_WALLET': {
      return getInitialState();
    }

    case 'SET_WALLET_DATA': {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default wallet;
