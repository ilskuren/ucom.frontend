const getInitialState = () => ({
  data: {},
  list: {},
});

const state = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_WALLET_STATE':
      return getInitialState();

    case 'SET_WALLET_STATE_DATA':
      return {
        ...state, data: { ...state.data, ...action.payload },
      };

    case 'SET_WALLET_TRANSACTIONS':
      return {
        ...state, list: { ...state.list, ...action.payload },
      };

    default:
      return state;
  }
};

export default state;
