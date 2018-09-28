const getInitialState = () => ({
  data: {},
});

const posts = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'POSTS_RESET': {
      return getInitialState();
    }

    case 'POSTS_ADD': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          [action.payload.id]: Object.assign({}, state.data[action.payload.id], action.payload),
        }),
      });
    }

    case 'POST_VOTE_UP': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          [action.payload]: Object.assign({}, state.data[action.payload], {
            currentVote: state.data[action.payload].currentVote + 1,
          }),
        }),
      });
    }

    case 'POST_VOTE_DOWN': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          [action.payload]: Object.assign({}, state.data[action.payload], {
            currentVote: state.data[action.payload].currentVote - 1,
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
