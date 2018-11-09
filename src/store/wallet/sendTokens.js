import { validateFields } from '../../utils/validateFields';

const getInitialState = () => ({
  visible: false,
  loading: false,
  isValid: false,
  errors: {},
  serverErrors: [],
  data: {
    user: null,
    amount: '',
    memo: '',
  },
  rules: {
    user: 'required',
    amount: 'required|integer',
  },
});

const sendTokens = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_WALLET_SEND_TOKENS':
      return getInitialState();

    case 'SET_WALLET_SEND_TOKENS_DATA': {
      const fields = Object.keys(action.payload);
      const data = { ...state.data, ...action.payload };
      const validation = validateFields(data, fields, state.rules);
      const errors = { ...state.errors, ...validation.errors };

      return {
        ...state, data, errors, isValid: validation.isValid,
      };
    }

    case 'SET_WALLET_SEND_TOKENS_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_WALLET_SEND_TOKENS_VISIBLE':
      return { ...state, visible: action.payload };

    case 'SET_WALLET_SEND_TOKENS_SERVER_ERRORS':
      return { ...state, serverErrors: action.payload };

    default:
      return state;
  }
};

export default sendTokens;
