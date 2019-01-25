import React from 'react';
import UserList from '../User/UserList';
import OrganizationList from './../Organization/OrganizationList';

const LIST_LIMIT = 5;

const PostsTab = () => (
  <div className="grid grid_publications">
    <div className="grid__item grid__item_main">
      {/* <Feed
        hasMore={props.feed.metadata.hasMore}
        postIds={props.feed.postIds}
        loading={props.feed.loading}
        loadMoreUrl={urls.getOverviewCategoryUrl({ filter: overviewCategory.name, page: page + 1 })}
        onClickLoadMore={onClickLoadMore}
      /> */}
    </div>

    <div className="grid__item grid__item_side">
      <div className="feed_side">
        <div className="sidebar">
          <div className="user-section">
            <div className="user-section__title">
              <h2 className="title title_xxsmall title_medium">
              Published by
              </h2>
            </div>
            <UserList isNew usersIds={[34, 40, 379]} limit={LIST_LIMIT} />
          </div>
          {/* <div className="user-section">
            <div className="user-section__title">
              <h2 className="title title_xxsmall title_medium">
              Included tags
              </h2>
            </div>
            <TagList />
          </div> */}

          <div className="user-section">
            <div className="user-section__title">
              <h2 className="title title_xxsmall title_medium">
              Communities
              </h2>
            </div>
            <OrganizationList isNew organizationsIds={[18, 4, 90, 13]} />
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default PostsTab;
