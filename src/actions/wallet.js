import { selectUser } from '../store/selectors/user';
import api from '../api';

export const resetWalletState = payload => ({ type: 'RESET_WALLET_STATE', payload });
export const setWalletStateData = payload => ({ type: 'SET_WALLET_STATE_DATA', payload });

export const resetWalletSendTokens = payload => ({ type: 'RESET_WALLET_SEND_TOKENS', payload });
export const setWalletSendTokensData = payload => ({ type: 'SET_WALLET_SEND_TOKENS_DATA', payload });
export const setWalletSendTokensLoading = payload => ({ type: 'SET_WALLET_SEND_TOKENS_LOADING', payload });
export const setWalletSendTokensVisible = payload => ({ type: 'SET_WALLET_SEND_TOKENS_VISIBLE', payload });

let getAccountStateTimer;

export const getAccountState = accountName => (dispatch) => {
  api.getAccountState(accountName)
    .then((data) => {
      dispatch(setWalletStateData(data));
    });
};

export const startFetchAccountState = accountName => (dispatch) => {
  clearInterval(getAccountStateTimer);
  dispatch(getAccountState(accountName));

  getAccountStateTimer = setInterval(() => {
    dispatch(getAccountState(accountName));
  }, 10000);
};

export const stopFetchAccountState = () => (dispatch) => {
  clearInterval(getAccountStateTimer);
  dispatch(resetWalletState());
};

export const sendTokens = () => (dispatch, getState) => {
  const state = getState();
  const user = selectUser(state);
  const accountNameFrom = user.accountName;
  const accountNameTo = state.wallet.sendTokens.data.user.accountName;
  const { amount, memo } = state.wallet.sendTokens.data;

  dispatch(setWalletSendTokensLoading(true));
  api.sendTokens(accountNameFrom, accountNameTo, amount, memo)
    .then(() => {
      dispatch(setWalletSendTokensLoading(false));
      dispatch(setWalletSendTokensVisible(false));
      dispatch(getAccountState(user.accountName));
    })
    .catch((data) => {
      console.log(data);
      dispatch(setWalletSendTokensLoading(false));
    });
};
