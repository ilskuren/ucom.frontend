import React from 'react';
import UserList from '../User/UserList';

const USERS_LIMIT = 5;

const TagUsers = (props) => {
  if (props.users === []) {
    return null;
  }

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h2 className="title title_xxsmall title_medium">
          Top uses by&nbsp;
          {props.users.length > USERS_LIMIT && <em>{props.users.length}</em>}
        </h2>
      </div>

      <UserList
        limit={USERS_LIMIT}
        usersIds={props.users}
        tagTitle={props.tagTitle}
      />
    </div>
  );
};

export default TagUsers;
