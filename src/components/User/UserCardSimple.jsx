import { connect } from 'react-redux';
import React from 'react';
import AvatarSimple from '../Avatar/AvatarSimple';
import { getUserById } from '../../store/users';
import { getUserName } from '../../utils/user';
import { getFileUrl } from '../../utils/upload';

const UserCardSimple = props => (
  <div className="user-card-simple">
    <div className="user-card-simple__avatar">
      <AvatarSimple
        src={props.avatarSrc}
        alt={props.avatarAlt}
      />
    </div>
    <div className="user-card-simple__name">
      {props.userName}
    </div>
    <div className="user-card-simple__rate">
      {props.rate}
    </div>
  </div>
);

export const UserCardSimpleWrapper = connect(
  state => ({
    users: state.users,
  }),
  null,
)((props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  return (
    <UserCardSimple
      avatarSrc={getFileUrl(user.avatarFilename)}
      avatarAlt={getUserName(user)}
      userName={getUserName(user)}
      rate={user.currentRate}
    />
  );
});

export default UserCardSimple;
