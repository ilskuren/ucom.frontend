import { combineReducers } from 'redux';

import { communicationReducer } from './communication';

export default combineReducers({
  communication: communicationReducer,
});
