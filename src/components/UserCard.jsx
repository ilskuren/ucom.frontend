import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import Avatar from './Avatar';
import Rate from './Rate';

const UserCard = (props) => {
  const avatar = <Avatar square={props.squareAvatar} rounded={props.roundedAvatar} src={props.avatarUrl} size={props.avatarSize} />;
  const LinkTag = props.profileLink ? Link : 'span';

  return (
    <div className={cn('user-card', props.className)}>
      <div className="user-card__avatar">
        {props.profileLink ? (
          <Link to={props.profileLink}>{avatar}</Link>
        ) : (
          <Fragment>{avatar}</Fragment>
        )}
      </div>

      <div className="user-card__info">
        <div className="user-card__name">
          <LinkTag to={props.profileLink}>{props.userName}</LinkTag>
        </div>

        {props.accountName && (
          <div className="user-card__account">{props.sign || '@'}{props.accountName}</div>
        )}
      </div>

      {props.isRated && (
        <div className="user-card__rate">
          <Rate />
        </div>
      )}
    </div>
  );
};

UserCard.propTypes = {
  squareAvatar: PropTypes.bool,
  roundedAvatar: PropTypes.bool,
  isRated: PropTypes.bool,
  userName: PropTypes.string,
  accountName: PropTypes.string,
  profileLink: PropTypes.string,
  avatarUrl: PropTypes.string,
  avatarSize: PropTypes.string,
  sign: PropTypes.string,
  className: PropTypes.string,
};

UserCard.defaultProps = {
  squareAvatar: false,
  roundedAvatar: false,
  isRated: false,
};

export default UserCard;
