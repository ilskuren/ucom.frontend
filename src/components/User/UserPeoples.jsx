import { connect } from 'react-redux';
import React from 'react';
import { getUserById } from '../../store/users';
import UserList from './UserList';

const USERS_LIMIT = 5;

const UserPeoples = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user || !user.iFollow || !user.iFollow.length) {
    return null;
  }

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h2 className="title title_xxsmall title_medium">
          People&nbsp;
          {user.iFollow.length > USERS_LIMIT && <em>{user.iFollow.length}</em>}
        </h2>
      </div>

      <UserList usersIds={user.iFollow} limit={USERS_LIMIT} />
    </div>
  );
};

export default connect(state => ({
  users: state.users,
}))(UserPeoples);
