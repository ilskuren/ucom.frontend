import React from 'react';
import UserCard from './UserCard';

const UserList = () => (
  <div className="user-list">

    <div className="user-list__user-container">
      <div className="toolbar">
        <div className="toolbar__main">
          <div className="user-list__user">
            <UserCard />
          </div>
        </div>
        <div className="toolbar__side">
          <span className="inline__item">
            <span className="user-list__remove-link">
              Remove from blacklist
            </span>
          </span>
        </div>
      </div>
    </div>

    <div className="user-list__user-container">
      <div className="toolbar">
        <div className="toolbar__main">
          <div className="user-list__user">
            <UserCard />
          </div>
        </div>
        <div className="toolbar__side">
          <span className="inline__item">
            <span className="user-list__remove-link">
              Remove from blacklist
            </span>
          </span>
        </div>
      </div>
    </div>

    <div className="user-list__user-container">
      <div className="toolbar">
        <div className="toolbar__main">
          <div className="user-list__user">
            <UserCard />
          </div>
        </div>
        <div className="toolbar__side">
          <span className="inline__item">
            <span className="user-list__remove-link">
              Remove from blacklist
            </span>
          </span>
        </div>
      </div>
    </div>

    <div className="user-list__user-container">
      <div className="toolbar">
        <div className="toolbar__main">
          <div className="user-list__user">
            <UserCard />
          </div>
        </div>
        <div className="toolbar__side">
          <span className="inline__item">
            <span className="user-list__remove-link">
              Remove from blacklist
            </span>
          </span>
        </div>
      </div>
    </div>

  </div>
);

export default UserList;
