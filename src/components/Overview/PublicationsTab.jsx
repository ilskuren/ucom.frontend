import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router';
import urls from '../../utils/urls';
import Feed from '../Feed/FeedView';
import UserList from '../User/UserList';
import OrganizationList from '../Organization/OrganizationList';
import TagList from './../Tag/TagList';
import * as overviewUtils from '../../utils/overview';
import * as feedActions from '../../actions/feed';
import { FEED_PER_PAGE } from '../../utils/feed';
import loader from '../../utils/loader';

const LIST_LIMIT = 5;

const Publications = (props) => {
  const page = +props.match.params.page || 1;
  const overviewCategoryName = props.match.params.filter;
  const overviewCategory = overviewUtils.OVERVIEW_CATEGORIES.find(i => i.name === overviewCategoryName);


  const { postTypeId } = props;

  const onClickLoadMore = () => {
    loader.start();
    props.dispatch(feedActions.feedGetPosts({
      categoryId: overviewCategory.id,
      page: +props.feed.metadata.page + 1,
      perPage: FEED_PER_PAGE,
      postTypeId,
    }))
      .then(loader.done());
  };

  React.useEffect(() => {
    loader.start();
    props.dispatch(feedActions.feedReset());
    props.dispatch(feedActions.feedGetPosts({
      categoryId: overviewCategory.id,
      page,
      perPage: FEED_PER_PAGE,
      postTypeId,
    }))
      .then(loader.done);
  }, [overviewCategoryName]);

  return (
    <div className="grid grid_publications">
      <div className="grid__item grid__item_main">
        <Feed
          hasMore={props.feed.metadata.hasMore}
          postIds={props.feed.postIds}
          loading={props.feed.loading}
          loadMoreUrl={urls.getOverviewCategoryUrl({ filter: overviewCategory.name, page: page + 1 })}
          onClickLoadMore={onClickLoadMore}
        />
      </div>

      <div className="grid__item grid__item_side">
        <div className="feed_side">
          <div className="sidebar">
            {!!props.feed.manyUsers.length &&
              <div className="user-section">
                <div className="user-section__title">
                  <h2 className="title title_xxsmall title_medium">
                  Published by
                  </h2>
                </div>
                <UserList
                  loadMore={() => props.dispatch(feedActions.feedGetSide({
                    postTypeId, categoryId: overviewCategory.id, tab: 'Posts', side: 'Users',
                  }))}
                  myUsers={props.feed.manyUsers}
                  limit={LIST_LIMIT}
                />
              </div>
            }
            {!!props.feed.manyTags.length &&
            <div className="user-section">
              <div className="user-section__title">
                <h2 className="title title_xxsmall title_medium">
                Included tags
                </h2>
              </div>
              <TagList
                loadMore={() => props.dispatch(feedActions.feedGetSide({
                  postTypeId, categoryId: overviewCategory.id, tab: 'Posts', side: 'Tags',
                }))}
                myTags={props.feed.manyTags}
                limit={LIST_LIMIT}
              />
            </div>
            }

            {!!props.feed.manyOrganizations.length &&
              <div className="user-section">
                <div className="user-section__title">
                  <h2 className="title title_xxsmall title_medium">
                  Communities
                  </h2>
                </div>
                <OrganizationList
                  loadMore={() => props.dispatch(feedActions.feedGetSide({
                    postTypeId, categoryId: overviewCategory.id, tab: 'Posts', side: 'Organizations',
                  }))}
                  limit={LIST_LIMIT}
                  myOrganizations={props.feed.manyOrganizations}
                />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(connect(state => ({
  feed: state.feed,
  posts: state.posts,
}))(Publications));

