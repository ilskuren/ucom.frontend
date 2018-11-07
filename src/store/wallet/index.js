import { combineReducers } from 'redux';
import sendTokens from './sendTokens';
import editStake from './editStake';
import state from './state';

export default combineReducers({
  state,
  sendTokens,
  editStake,
});
