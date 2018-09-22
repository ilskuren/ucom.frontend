import { combineReducers } from 'redux';

import { communicationReducer } from './communication';
import user from './data';

export default combineReducers({
  data: user,
  communication: communicationReducer,
});
