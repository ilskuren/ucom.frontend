const getInitialState = () => ({
  data: [],
});

const governanceNodes = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'GOVERNANCE_NODES_RESET':
      return getInitialState();

    case 'GOVERNANCE_NODES_ADD_DATA':
      return {
        ...state,
        data: state.data.concat(action.payload),
      };

    case 'GOVERNANCE_NODES_SET_VOTE':
      return {
        ...state,
        data: state.data.map((item) => {
          if (+item.id === +action.payload.id && item.myselfData) {
            item.myselfData.bpVote = action.payload.vote;
          }

          return item;
        }),
      };

    default:
      return state;
  }
};

export default governanceNodes;
