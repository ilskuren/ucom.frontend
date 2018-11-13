import { validateFields } from '../../utils/validateFields';

const getInitialState = () => ({
  visible: false,
  loading: false,
  isValid: false,
  isBuy: false,
  errors: {},
  serverErrors: [],
  data: {
    price: '',
    bytesAmount: '',
  },
  rules: {
    bytesAmount: 'required|integer',
  },
});

const tradeRam = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_WALLET_TRADE_RAM':
      return getInitialState();

    case 'SET_WALLET_TRADE_RAM_DATA': {
      const fields = Object.keys(action.payload);
      const data = { ...state.data, ...action.payload };
      const validation = validateFields(data, fields, state.rules);
      const errors = { ...state.errors, ...validation.errors };

      return {
        ...state, data, errors, isValid: validation.isValid,
      };
    }

    case 'SET_WALLET_TRADE_RAM_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_WALLET_TRADE_RAM_VISIBLE':
      return { ...state, visible: action.payload };

    case 'SET_WALLET_TRADE_RAM_IS_BUY':
      return { ...state, isBuy: action.payload };

    case 'SET_WALLET_TRADE_RAM_SERVER_ERRORS':
      return { ...state, serverErrors: action.payload };

    default:
      return state;
  }
};

export default tradeRam;
