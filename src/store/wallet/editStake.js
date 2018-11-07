import Validator from 'validatorjs';

const getInitialState = () => ({
  visible: false,
  loading: false,
  isValid: false,
  errors: {},
  data: {
    netAmount: '',
    cpuAmount: '',
  },
  rules: {
    netAmount: 'required|integer',
    cpuAmount: 'required|integer',
  },
});

const editStake = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_WALLET_EDIT_STAKE':
      return getInitialState();

    case 'SET_WALLET_EDIT_STAKE_DATA': {
      const keys = Object.keys(action.payload);
      const data = { ...state.data, ...action.payload };
      const validation = new Validator(data, state.rules);
      const isValid = validation.passes();
      const currentErrors = keys.reduce((value, key) => ({ ...value, [key]: validation.errors.get(key) }), {});
      const errors = { ...state.errors, ...currentErrors };

      return {
        ...state, data, errors, isValid,
      };
    }

    case 'SET_WALLET_EDIT_STAKE_LOADING':
      return {
        ...state, loading: action.payload,
      };

    case 'SET_WALLET_EDIT_STAKE_VISIBLE':
      return {
        ...state, visible: action.payload,
      };

    default:
      return state;
  }
};

export default editStake;
