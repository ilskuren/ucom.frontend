const getInitialState = () => ({
  data: {},
});

const posts = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_POST': {
      return getInitialState();
    }

    case 'ADD_POST': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          [action.payload.id]: Object.assign({}, state.data[action.payload.id], action.payload),
        }),
      });
    }

    case 'ADD_POSTS': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, action.payload
          .reduce((value, item) => ({ ...value, [item.id]: Object.assign({}, state.data[item.id], item) }), {})),
      });
    }

    case 'SET_POST_VOTE_UP': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          [action.payload.id]: Object.assign({}, state.data[action.payload.id], {
            currentVote: state.data[action.payload.id] + 1,
          }),
        }),
      });
    }

    case 'SET_POST_VOTE_DOWN': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          [action.payload.id]: Object.assign({}, state.data[action.payload.id], {
            currentVote: state.data[action.payload.id] - 1,
          }),
        }),
      });
    }

    default: {
      return state;
    }
  }
};

export default posts;
