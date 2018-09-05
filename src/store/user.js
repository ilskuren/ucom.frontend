const getInitialState = () => ({ id: 1 });

const user = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, action.data);
    case 'REMOVE_USER':
      return getInitialState();
    default:
      return state;
  }
};

export default user;
