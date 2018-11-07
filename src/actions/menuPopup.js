import { getAccountState } from './wallet';

export const hideMenuPopup = () => ({ type: 'HIDE_MENU_POPUP' });

export const showMenuPopup = () => (dispatch) => {
  dispatch(getAccountState());
  dispatch({ type: 'SHOW_MENU_POPUP' });
};

export const triggerMenuPopup = () => (dispatch, getState) => {
  const state = getState();

  if (state.menuPopup.menuPopupVisibility) {
    dispatch(hideMenuPopup());
  } else {
    dispatch(showMenuPopup());
  }
};
