import store from '../store';
import api from '../api';
import { POST_TYPE_MEDIA_ID } from '../utils/posts';

export const getMainPostGroupData = () =>
  api.getPosts({
    postTypeId: POST_TYPE_MEDIA_ID,
    sortBy: '-current_rate',
  })
    .then((data) => {
      store.dispatch({ type: 'MAIN_POST_GROUP_RESET' });
      store.dispatch({ type: 'MAIN_POST_GROUP_ADD_POSTS', payload: data.data });

      return data.data;
    });
