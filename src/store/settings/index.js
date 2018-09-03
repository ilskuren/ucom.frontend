import { combineReducers } from 'redux';
import account from './account';
import security from './security';

export default combineReducers({ account, security });
