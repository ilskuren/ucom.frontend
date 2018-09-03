import { combineReducers } from 'redux';
import account from './account';
import security from './security';
import notifications from './notifications';
import blacklist from './blacklist';
import referral from './referral';

export default combineReducers({
  account,
  security,
  notifications,
  blacklist,
  referral,
});
