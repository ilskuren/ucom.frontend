export const FIRST_STEP_ID = 1;
export const SECOND_STEP_ID = 2;
export const THIRD_STEP_ID = 3;

const getInitialState = () => ({
  accountName: '',
  accountNameIsValid: false,
  accountNameError: '',
  brainkey: '',
  brainkeyIsValid: false,
  acceptTerms: false,
  acceptSendStatistic: false,
  activeStepId: FIRST_STEP_ID,
});

const registration = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'REGISTRATION_RESET':
      return getInitialState();

    case 'REGISTRATION_SET_STEP':
      return {
        ...state,
        activeStepId: action.payload,
      };

    case 'REGISTRATION_SET_ACCOUNT_NAME':
      return {
        ...state,
        accountName: action.payload,
      };

    case 'REGISTRATION_SET_ACCOUNT_NAME_ERROR':
      return {
        ...state,
        accountNameError: action.payload,
      };

    case 'REGISTRATION_SET_ACCOUNT_NAME_IS_VALID':
      return {
        ...state,
        accountNameIsValid: action.payload,
      };

    default:
      return state;
  }
};

export default registration;
