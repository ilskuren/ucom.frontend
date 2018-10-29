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
    case 'TRIGGER_MENU_POPUP': {
      return { ...state, menuPopupVisibility: !state.menuPopupVisibility };
    }
    default: {
      return state;
    }
  }
};

export default menuPopup;
