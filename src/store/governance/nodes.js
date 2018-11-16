const getInitialState = () => ({
  data: [],
  metadata: {},
});

const governanceNodes = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'GOVERNANCE_NODES_RESET':
      return getInitialState();

    case 'GOVERNANCE_NODES_SET_DATA':
      return { ...state, ...action.payload };

    default: {
      return state;
    }
  }
};

export default governanceNodes;
