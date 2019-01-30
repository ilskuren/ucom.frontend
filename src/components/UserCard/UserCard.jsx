import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import UserPick from '../UserPick/UserPick';
import { getUserById } from '../../store/users';
import { getUserName } from '../../utils/user';
import urls from '../../utils/urls';
import styles from './styles.css';
import { formatRate } from '../../utils/rate';

const UserCard = (props) => {
  const LinkTag = props.url ? Link : 'div';

  return (
    <div className={styles.userCard}>
      <div className={styles.avatar}>
        <UserPick isOwner={props.isOwner} url={props.url} src={props.userPickSrc} alt={props.userPickAlt} />
      </div>
      <div className={styles.name}>
        <LinkTag to={props.url}>{props.name}</LinkTag>
      </div>
      <div className={styles.rate}>
        {formatRate(props.rate)}°
      </div>
    </div>
  );
};

UserCard.propTypes = {
  userPickSrc: PropTypes.string,
  userPickAlt: PropTypes.string,
  name: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  url: PropTypes.string,
  isOwner: PropTypes.bool,
};

UserCard.defaultProps = {
  userPickSrc: null,
  userPickAlt: null,
  url: PropTypes.null,
  isOwner: false,
};

export default connect(
  (state, props) => () => {
    const user = getUserById(state.users, props.userId);

    return ({
      ...props,
      userPickSrc: urls.getFileUrl(user.avatarFilename),
      userPickAlt: getUserName(user),
      url: urls.getUserUrl(user.id),
      name: getUserName(user),
      rate: user.currentRate,
    });
  },
  null,
)(UserCard);
