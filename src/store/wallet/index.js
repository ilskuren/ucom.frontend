import { combineReducers } from 'redux';
import sendTokens from './sendTokens';
import editStake from './editStake';
import tradeRam from './tradeRam';
import state from './state';
import transactions from './transactions';

export default combineReducers({
  state,
  sendTokens,
  editStake,
  tradeRam,
  transactions,
});
