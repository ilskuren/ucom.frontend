const getInitialState = () => ({
  data: {},
});

const tags = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'ADD_TAGS': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, action.payload
          .reduce((value, item) => ({ ...value, [item.title]: Object.assign({}, state.data[item.title], item) }), {})),
      });
    }

    default: {
      return state;
    }
  }
};

export default tags;
