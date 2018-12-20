import React from 'react';
import UserList from '../User/UserList';

const USERS_LIMIT = 5;

const TagUsers = (props) => {
  if (!props.users) {
    return null;
  }

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h2 className="title title_xxsmall title_medium">
          People&nbsp;
          {props.users.length > USERS_LIMIT && <em>{props.users.length}</em>}
        </h2>
      </div>

      <UserList
        usersIds={props.users.map(item => item.id)}
        limit={USERS_LIMIT}
      />
    </div>
  );
};

export default TagUsers;
