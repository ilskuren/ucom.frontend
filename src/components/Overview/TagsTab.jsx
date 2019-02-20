import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// import UserList from '../User/UserList';
import TagsList from './TagsList';
import * as overviewUtils from '../../utils/overview';
import * as feedActions from '../../actions/tagsFeed';
import loader from '../../utils/loader';
import { FEED_PER_PAGE } from '../../utils/feed';
import urls from '../../utils/urls';
// const LIST_LIMIT = 5;

const TagsTab = (props) => {
  const page = +props.match.params.page || 1;
  const overviewCategoryName = props.match.params.filter;
  const overviewCategory = overviewUtils.OVERVIEW_CATEGORIES.find(i => i.name === overviewCategoryName);

  const onClickLoadMore = () => {
    loader.start();
    props.dispatch(feedActions.tagsFeedGet({
      page: +props.tagsFeed.metadata.page + 1,
      perPage: FEED_PER_PAGE,
      categoryId: overviewCategory.id,
    }))
      .then(loader.done());
  };

  React.useEffect(() => {
    loader.start();
    props.dispatch(feedActions.tagsFeedReset());
    props.dispatch(feedActions.tagsFeedGet({
      page,
      perPage: FEED_PER_PAGE,
      categoryId: overviewCategory.id,
    }))
      .then(loader.done);
  }, [overviewCategoryName]);
  return (
    <div className="grid grid_publications">
      <div className="grid__item grid__item_main">
        <TagsList
          hasMore={props.tagsFeed.metadata.hasMore}
          tagIds={props.tagsFeed.tagIds}
          loading={props.tagsFeed.loading}
          loadMoreUrl={urls.getOverviewCategoryUrl({ filter: overviewCategoryName, page: page + 1, route: 'tags' })}
          onClickLoadMore={onClickLoadMore}
        />
      </div>

      <div className="grid__item grid__item_side">
        <div className="feed_side">
          <div className="sidebar">
            {/* <div className="user-section">
                <div className="user-section__title">
                  <h2 className="title title_xxsmall title_medium">
                  Top uses by
                  </h2>
                </div>
                <UserList isNew usersIds={[34, 40, 379]} limit={LIST_LIMIT} />
              </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};


export default withRouter(connect(state => ({
  tagsFeed: state.tagsFeed,
}))(TagsTab));
