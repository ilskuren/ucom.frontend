import { NOTIFICATION_TYPE_ERROR } from '../store/notifications';
import { showAuthPopup } from './';

export const addNotification = payload => ({ type: 'ADD_NOTIFICATION', payload });
export const closeNotification = payload => ({ type: 'CLOSE_NOTIFICATION', payload });

export const addValidationErrorNotification = () => (dispatch) => {
  dispatch(addNotification({
    type: NOTIFICATION_TYPE_ERROR,
    message: 'Some fields in the form are incorrect',
  }));
};

export const addErrorNotification = message => (dispatch) => {
  if (message === 'Request failed with status code 401') {
    dispatch(showAuthPopup());
  }
  dispatch(addNotification({ type: NOTIFICATION_TYPE_ERROR, message }));
};
