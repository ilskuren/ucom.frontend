const getInitialState = () => ({
  data: {
  },
});

const post = (state = getInitialState(), action) => {
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

    default: {
      return state;
    }
  }
};

export default post;
