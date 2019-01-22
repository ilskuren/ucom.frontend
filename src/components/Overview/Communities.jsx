import React from 'react';
import UserList from './../User/UserList';
import CommunitiesList from './CommunitiesList';
// import * as overviewUtils from '../../utils/overview';
// import loader from '../../utils/loader';

const LIST_LIMIT = 5;

const Communities = () => {
  const organizationsIds = [91, 102, 40, 99];
  return (
    <div className="grid grid_publications">
      <div className="grid__item grid__item_main">
        <CommunitiesList organizationsIds={organizationsIds} />
      </div>

      <div className="grid__item grid__item_side">
        <div className="feed_side">
          <div className="sidebar">
            {
              <div className="user-section">
                <div className="user-section__title">
                  <h2 className="title title_xxsmall title_medium">
                  Most Active Members
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
};


export default Communities;
