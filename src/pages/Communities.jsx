import { uniq, compact } from 'lodash';
import { connect } from 'react-redux';
import React from 'react';
import urls from '../utils/urls';
import Feed from '../components/Feed/FeedView';
import UserList from '../components/User/UserList';
import OrganizationList from '../components/Organization/OrganizationList';
// import TagList from '../components/Tag/TagList';
import * as overviewUtils from '../utils/overview';
import { getPostById } from '../store/posts';
import * as feedActions from '../actions/feed';
import { FEED_PER_PAGE } from '../utils/feed';
import loader from '../utils/loader';

const LIST_LIMIT = 5;

const Communities = (props) => {
  if (0) console.log('');
  return (
    <div className="grid grid_publications">
      <div className="grid__item grid__item_main">
        <Feed
          hasMore={props.feed.metadata.hasMore}
          postIds={props.feed.postIds}
          loading={props.feed.loading}
        />
      </div>

      <div className="grid__item grid__item_side">
        <div className="feed_side">
          <div className="sidebar">
            {!!usersIds.length &&
              <div className="user-section">
                <div className="user-section__title">
                  <h2 className="title title_xxsmall title_medium">
                  Published by
                  </h2>
                </div>
                <UserList isNew usersIds={usersIds} limit={LIST_LIMIT} />
              </div>
            }
            {/* <div className="user-section">
              <div className="user-section__title">
                <h2 className="title title_xxsmall title_medium">
                Included tags
                </h2>
              </div>
              <TagList />
            </div> */}

            {!!orgsIds.length &&
              <div className="user-section">
                <div className="user-section__title">
                  <h2 className="title title_xxsmall title_medium">
                  Communities
                  </h2>
                </div>
                <OrganizationList isNew limit={LIST_LIMIT} organizationsIds={orgsIds} />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export const getPublicationsPageData = (store, { name, page = 1 }) => {
  const overviewCategoryId = overviewUtils.OVERVIEW_CATEGORIES.find(i => i.name === name).id;

  return store.dispatch(feedActions.feedGetPosts(overviewCategoryId, { page, perPage: FEED_PER_PAGE }));
};

export default Communities;
