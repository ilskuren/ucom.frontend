const getInitialState = () => ({
  menuPopupVisibility: false,
});

const menuPopup = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'SHOW_MENU_POPUP': {
      return { ...state, menuPopupVisibility: true };
    }

    case 'HIDE_MENU_POPUP': {
      return { ...state, menuPopupVisibility: false };
    }

    default: {
      return state;
    }
  }
};

export default menuPopup;
