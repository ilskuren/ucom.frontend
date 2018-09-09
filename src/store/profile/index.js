
import { combineReducers } from 'redux';
import contacts from './contacts';
import generalInfo from './generalInfo';
import workAndEducation from './workAndEducation';

export default combineReducers({
  contacts,
  generalInfo,
  workAndEducation,
});
