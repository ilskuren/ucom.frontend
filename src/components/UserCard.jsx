import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import Avatar from './Avatar';

const UserCard = (props) => {
  const avatar = <Avatar square={props.squareAvatar} rounded={props.roundedAvatar} src={props.avatarUrl} size={props.avatarSize} />;
  const LinkTag = props.profileLink ? Link : 'span';

  return (
    <div className={cn('user-card', props.className)}>
      <div className="user-card__avatar">
        <LinkTag to={props.profileLink}>{avatar}</LinkTag>
      </div>

      <div className="user-card__info">
        <div className="user-card__name">
          <LinkTag to={props.profileLink}>{props.userName}</LinkTag>
        </div>

        {props.rate && (
          <div className="user-card__rate">{(+props.rate).toLocaleString()}°</div>
        )}

        {props.accountName && !props.rate && (
          <div className="user-card__account">{props.sign}{props.accountName}</div>
        )}
      </div>
    </div>
  );
};

UserCard.propTypes = {
  squareAvatar: PropTypes.bool,
  roundedAvatar: PropTypes.bool,
  userName: PropTypes.string,
  accountName: PropTypes.string,
  profileLink: PropTypes.string,
  avatarUrl: PropTypes.string,
  avatarSize: PropTypes.string,
  sign: PropTypes.string,
  className: PropTypes.string,
  rate: PropTypes.number,
};

UserCard.defaultProps = {
  squareAvatar: false,
  roundedAvatar: false,
  sign: '@',
};

export default UserCard;
