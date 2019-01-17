import { uniq, compact } from 'lodash';
import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router';

import urls from '../utils/urls';
import Feed from '../components/Feed/FeedView';
import UserList from '../components/User/UserList';
import OrganizationList from '../components/Organization/OrganizationList';
import TagList from '../components/Tag/TagList';
import * as overviewUtils from '../utils/overview';
import NotFoundPage from './NotFoundPage';
import { getPostById } from '../store/posts';
import * as feedActions from '../actions/feed';
import { FEED_PER_PAGE } from '../utils/feed';
import loader from '../utils/loader';

const LIST_LIMIT = 5;

const Publications = (props) => {
  const page = +props.match.params.page || 1;
  const postsCategoryName = props.match.params.filter;
  const postsCategory = overviewUtils.OVERVIEW_CATEGORIES.find(i => i.name === postsCategoryName);

  if (!postsCategory) {
    return <NotFoundPage />;
  }

  const posts = props.feed.postIds.map(id => getPostById(props.posts, id));
  const usersIds = compact(uniq(posts.map(i => i.userId)));
  const orgsIds = compact(uniq(posts.map(i => i.organizationId)));

  const onClickLoadMore = () => {
    loader.start();
    props.dispatch(feedActions.feedGetPosts(postsCategory.id, {
      page: +props.feed.metadata.page + 1,
      perPage: FEED_PER_PAGE,
    }))
      .then(loader.done());
  };

  React.useEffect(() => {
    loader.start();
    props.dispatch(feedActions.feedReset());
    props.dispatch(feedActions.feedGetPosts(postsCategory.id, {
      page,
      perPage: FEED_PER_PAGE,
    }))
      .then(loader.done);
  }, [postsCategoryName]);

  return (
    <div className="grid grid_publications">
      <div className="grid__item grid__item_main">
        <Feed
          hasMore={props.feed.metadata.hasMore}
          postIds={props.feed.postIds}
          loading={props.feed.loading}
          loadMoreUrl={urls.getOverviewCategoryUrl(postsCategory.name, page + 1)}
          onClickLoadMore={onClickLoadMore}
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
            <div className="user-section">
              <div className="user-section__title">
                <h2 className="title title_xxsmall title_medium">
                Included tags
                </h2>
              </div>
              <TagList />
            </div>

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
  const postsCategoryId = overviewUtils.OVERVIEW_CATEGORIES.find(i => i.name === name).id;

  return store.dispatch(feedActions.feedGetPosts(postsCategoryId, { page, perPage: FEED_PER_PAGE }));
};

export default withRouter(connect(state => ({
  feed: state.feed,
  posts: state.posts,
}))(Publications));
