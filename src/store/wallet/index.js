import { combineReducers } from 'redux';
import sendTokens from './sendTokens';
import state from './state';

export default combineReducers({
  state,
  sendTokens,
});
