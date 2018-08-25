import { createStore } from 'redux';

const getInitialState = () => ({
  user: { id: 1 },
});

const app = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.data),
      });
    case 'REMOVE_USER':
      return Object.assign({}, state, { user: {} });
    default:
      return state;
  }
};

export default createStore(app);
