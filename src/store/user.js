import { getContactsInitialState } from './profile/contacts';
import { getGeneralInfoInitialState } from './profile/generalInfo';
import { getWorkAndEducationInitialState } from './profile/workAndEducation';

const getInitialState = () => ({
  id: 1,
  profile: {
    contacts: getContactsInitialState(),
    generalInfo: getGeneralInfoInitialState(),
    workAndEducation: getWorkAndEducationInitialState(),
  },
});

const user = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, action.data);
    case 'REMOVE_USER':
      return getInitialState();
    default:
      return state;
  }
};

export default user;
