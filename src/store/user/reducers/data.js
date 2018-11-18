const getInitialState = () => ({});

const user = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
      };

    case 'REMOVE_USER':
      return getInitialState();

    default:
      return state;
  }
};

export default user;
