import humps from 'lodash-humps';
import * as axios from 'axios';
import { getBackendConfig } from '../utils/config';
import { getToken } from '../utils/token';

const request = (data) => {
  const options = {
    baseURL: getBackendConfig().httpEndpoint,
    headers: {},
  };

  const token = getToken();

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return axios.post('/graphql', data, options);
};

export default {
  getUserWallFeed({ userId, page, perPage }) {
    return request({
      query: `{
        user_wall_feed(user_id: ${userId}, page: ${page}, per_page: ${perPage}) {
          data {
            id
            title
            post_type_id
            main_image_filename
            description
            user_id
            blockchain_id
            created_at
            updated_at
            comments_count
            current_vote
            current_rate
            entity_id_for
            entity_name_for

            myselfData {
              myselfVote
              join
              organization_member
              repost_available
              follow
              myFollower
              editable
              member
            }

            User {
              id
              account_name
              first_name
              last_name
              nickname
              avatar_filename
              current_rate
            }

            comments {
              data {
                id
              }
              metadata {
                page
                per_page
                has_more
              }
            }
          }

          metadata {
            page
            per_page
            has_more
          }
        }
      }`,
    })
      .then((resp) => {
        const data = humps(resp.data);

        return data.data.userWallFeed;
      });
  },
};
