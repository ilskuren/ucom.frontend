import { validateFields } from '../utils/validateFields';

export const FIRST_STEP_ID = 1;
export const SECOND_STEP_ID = 2;
export const THIRD_STEP_ID = 3;
export const FOURTH_STEP_ID = 4;

const getInitialState = () => ({
  brainkey: '',
  brainkeyVerification: '',
  currentStepId: FIRST_STEP_ID,
  acceptTerms: false,
  sendStatistic: false,
  loading: false,
  errors: {},
  serverErrors: [],
  form: {
    accountName: '',
    password: '',
    passwordConfirm: '',
  },
  rules: {
    accountName: 'required|alpha|max:12|min:12',
    password: 'required',
    passwordConfirm: 'required',
  },
});

const registrationn = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'REGISTRATION_RESET':
      return getInitialState();

    case 'REGISTRATION_SET_FORM': {
      const fields = Object.keys(action.payload);
      const form = { ...state.form, ...action.payload };
      const validation = validateFields(form, fields, state.rules);
      const errors = { ...state.errors, ...validation.errors };
      const { isValid } = validation;

      return {
        ...state, form, errors, isValid,
      };
    }

    case 'REGISTRATION_SET_DATA':
      return { ...state, ...action.payload };

    default: {
      return state;
    }
  }
};

export default registrationn;
