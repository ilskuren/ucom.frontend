import Validator from '../utils/validator';

export const registrationSetStep = payload => ({ type: 'REGISTRATION_SET_STEP', payload });
export const registrationSetAccountName = payload => ({ type: 'REGISTRATION_SET_ACCOUNT_NAME', payload });
export const registrationSetAccountNameError = payload => ({ type: 'REGISTRATION_SET_ACCOUNT_NAME_ERROR', payload });
export const registrationSetAccountNameIsValid = payload => ({ type: 'REGISTRATION_SET_ACCOUNT_NAME_IS_VALID', payload });

export const registrationValidateAccountName = () => (dispatch, getState) => {
  const state = getState();
  const { accountName } = state.registration;
  const validator = new Validator({
    accountName,
  }, {
    accountName: ['required', 'regex:/^[a-z1-5]{12}$/', 'accountname'],
  });

  validator.setAttributeNames({ accountName: 'account name' });

  validator.checkAsync(() => {
    dispatch(registrationSetAccountNameError(null));
    dispatch(registrationSetAccountNameIsValid(true));
  }, () => {
    const error = validator.errors.first('accountName');
    dispatch(registrationSetAccountNameError(error));
    dispatch(registrationSetAccountNameIsValid(false));
  });
};

export const registrationSetAndValidateAccountName = payload => (dispatch) => {
  dispatch(registrationSetAccountName(payload));
  dispatch(registrationValidateAccountName(payload));
};
