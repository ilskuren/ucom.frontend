import api from '../api';
import { POST_TYPE_MEDIA_ID } from '../utils/posts';

export const getMainPostGroupData = () => dispatch =>
  api.getPosts({
    postTypeId: POST_TYPE_MEDIA_ID,
    sortBy: '-current_rate',
  })
    .then((data) => {
      dispatch({ type: 'MAIN_POST_GROUP_RESET' });
      dispatch({ type: 'MAIN_POST_GROUP_ADD_POSTS', payload: data.data });
    });
