import { NOTIFICATION_TYPE_ERROR } from '../store/notifications';
import { showAuthPopup } from './';
import { parseErrors } from '../utils/errors';

export const addNotification = payload => ({ type: 'ADD_NOTIFICATION', payload });
export const closeNotification = payload => ({ type: 'CLOSE_NOTIFICATION', payload });

export const addValidationErrorNotification = () => (dispatch) => {
  dispatch(addNotification({
    type: NOTIFICATION_TYPE_ERROR,
    message: 'Some fields in the form are incorrect',
  }));
};

export const addErrorNotification = error => (dispatch) => {
  if ((error.response && error.response.status) === 401) {
    dispatch(showAuthPopup());
  } else {
    dispatch(addNotification({ type: NOTIFICATION_TYPE_ERROR, message: parseErrors(error).general }));
  }
};
