import api from '../../api';
import { postsAdd } from '../index';

export const getOrganizationPosts = id => (dispatch) => {
  api.getOrganizationPosts(id)
    .then((data) => {
      // const posts = data.data;

      // posts.forEach(post => )

    });
};
