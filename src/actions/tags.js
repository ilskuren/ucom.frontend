import { addUsers } from './users';
import { addPosts } from './posts';
import { addOrganizations } from './organizations';

export const addTags = (payload = []) => (dispatch) => {
  const tag = [];

  const parseTag = (payload) => {
    if (payload.users.data) {
      dispatch(addUsers(payload.users.data));
      payload.users.data = payload.users.data.map(u => u.id);
    }

    if (payload.posts.data) {
      dispatch(addPosts(payload.posts.data));
      payload.posts.data = payload.posts.data.map(u => u.id);
    }

    if (payload.orgs.data) {
      dispatch(addOrganizations(payload.orgs.data));
      payload.orgs.data = payload.orgs.data.map(u => u.id);
    }

    tag.push(payload);
  };

  payload.forEach(parseTag);
  dispatch({ type: 'ADD_TAGS', payload: tag });
};
