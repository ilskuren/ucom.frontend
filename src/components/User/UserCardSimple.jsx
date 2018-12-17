import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import UserPick from '../UserPick';
import { getUserById } from '../../store/users';
import { getUserName } from '../../utils/user';
import urls from '../../utils/urls';

const UserCardSimple = (props) => {
  const LinkTag = props.url ? Link : 'div';

  return (
    <div className="user-card-simple">
      <div className="user-card-simple__avatar">
        <UserPick url={props.url} src={props.userPickSrc} alt={props.userPickAlt} />
      </div>
      <div className="user-card-simple__name">
        <LinkTag to={props.url}>{props.name}</LinkTag>
      </div>
      <div className="user-card-simple__rate">
        {props.rate}°
      </div>
    </div>
  );
};

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
      userPickSrc={urls.getFileUrl(user.avatarFilename)}
      userPickAlt={getUserName(user)}
      url={urls.getUserUrl(user.id)}
      name={getUserName(user)}
      rate={user.currentRate}
    />
  );
});

export default UserCardSimple;
