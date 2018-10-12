const getInitialState = () => ({
  showPopup: false,
});

const auth = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'SHOW_AUTH_POPUP': {
      return { ...state, showPopup: true };
    }

    case 'HIDE_AUTH_POPUP': {
      return { ...state, showPopup: false };
    }

    default: {
      return state;
    }
  }
};

export default auth;
