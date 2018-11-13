import api from '../api';
import snakes from '../utils/snakes';
import { parseErrors } from '../utils/errors';
import { saveToken } from '../utils/token';
import { saveBrainkey } from '../utils/brainkey';
import loader from '../utils/loader';

export const userFormReset = () => ({ type: 'USER_FORM__RESET' });
export const userFormSetForm = payload => ({ type: 'USER_FORM__SET_FORM', payload });
export const userFormSetData = payload => ({ type: 'USER_FORM__SET_DATA', payload });

export const authLogin = () => async (dispatch, getState) => {
  const state = getState();

  dispatch(userFormSetData({ loading: true }));
  loader.start();

  setTimeout(async () => {
    try {
      const data = await api.login(snakes(state.auth.form));
      saveToken(data.token);
      saveBrainkey(state.auth.form.brainkey);
      window.location.reload();
    } catch (e) {
      loader.done();
      dispatch(userFormSetData({
        serverErrors: parseErrors(e),
        loading: false,
      }));
    }
  }, 0);
};
