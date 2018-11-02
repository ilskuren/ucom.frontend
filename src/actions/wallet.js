import api from '../api';

let getAccountStateTimer;

export const setWalletData = payload => ({ type: 'SET_WALLET_DATA', payload });
export const resetWallet = payload => ({ type: 'RESET_WALLET', payload });

export const getAccountState = accountName => (dispatch) => {
  api.getAccountState(accountName)
    .then((data) => {
      dispatch(setWalletData(data));
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
  dispatch(resetWallet());
};
