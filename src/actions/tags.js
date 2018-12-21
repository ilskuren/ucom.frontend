import { addUsers } from './users';
import { addOrganizations } from './organizations';

export const addTags = (payload = []) => (dispatch) => {
  const tags = [];

  const parseTag = (payload) => {
    tags.push(payload);

    if (payload.users.data) {
      dispatch(addUsers(payload.users.data));
    }

    if (payload.orgs.data) {
      dispatch(addOrganizations(payload.orgs.data));
    }
  };

  payload.forEach(parseTag);
  dispatch({ type: 'ADD_TAGS', payload: tags });
};
