import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import UserPick from '../UserPick/UserPick';
import { getUserById } from '../../store/users';
import { getUserName } from '../../utils/user';
import urls from '../../utils/urls';
import styles from './styles.css';

export const UserCard = (props) => {
  const LinkTag = props.url ? Link : 'div';

  return (
    <div className={styles.userCard}>
      <div className={styles.avatar}>
        <UserPick url={props.url} src={props.userPickSrc} alt={props.userPickAlt} />
      </div>
      <div className={styles.name}>
        <LinkTag to={props.url}>{props.name}</LinkTag>
      </div>
      <div className={styles.rate}>
        {props.rate}°
      </div>
    </div>
  );
};

export default connect(
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
    <UserCard
      userPickSrc={urls.getFileUrl(user.avatarFilename)}
      userPickAlt={getUserName(user)}
      url={urls.getUserUrl(user.id)}
      name={getUserName(user)}
      rate={user.currentRate}
    />
  );
});
