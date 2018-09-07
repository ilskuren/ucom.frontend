
import { combineReducers } from 'redux';
import contacts from './contacts';
import generalInfo from './generalInfo';
import worksAndEducations from './worksAndEducations';

export default combineReducers({
  contacts,
  generalInfo,
  worksAndEducations,
});
