import React from 'react';
import UserCard from './UserCard';

const UserList = () => (
  <div className="user-list">

    {
        [0, 0, 0, 0].map(() => (
          <div className="user-list__user-container">
            <div className="toolbar">
              <div className="toolbar__main">
                <div className="user-list__user">
                  <UserCard />
                </div>
              </div>
              <div className="toolbar__side">
                <span className="inline__item">
                  <a href="#" className="user-list__remove-link">
                    Remove from blacklist
                  </a>
                </span>
              </div>
            </div>
          </div>
      ))
    }

  </div>
);

export default UserList;
