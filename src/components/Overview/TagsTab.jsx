import React from 'react';
import UserList from '../User/UserList';
import TagsList from './TagsList';

const LIST_LIMIT = 5;

const TagsTab = () => (
  <div className="grid grid_publications">
    <div className="grid__item grid__item_main">
      <TagsList />
    </div>

    <div className="grid__item grid__item_side">
      <div className="feed_side">
        <div className="sidebar">
          {
            <div className="user-section">
              <div className="user-section__title">
                <h2 className="title title_xxsmall title_medium">
                Top uses by
                </h2>
              </div>
              <UserList isNew usersIds={[34, 40, 379]} limit={LIST_LIMIT} />
            </div>
          }
        </div>
      </div>
    </div>
  </div>
);


export default TagsTab;
