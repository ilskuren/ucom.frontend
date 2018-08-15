const getInitialState = () => ({
  user: {},
});

const app = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, {
        user: Object.assign({}, state, action.data),
      });
    default:
      return state;
  }
};

export default app;
