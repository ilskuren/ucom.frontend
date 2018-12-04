const getInitialState = () => ({
  list: {
    data: [],
    metadata: {
      hasMore: false,
    },
  },
});

const state = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'WALLET_TRANSACTIONS_RESET':
      return getInitialState();

    case 'WALLET_TRANSACTIONS_SET_DATA':
      return {
        ...state, list: { ...state.list, ...action.payload, data: [...state.list.data, ...action.payload.data] },
      };

    default:
      return state;
  }
};

export default state;
