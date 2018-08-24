import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import Rate from './Rate';

const UserCard = (props) => {
  const avatar = <Avatar square={props.squareAvatar} src={props.avatarUrl} size={props.avatarSize} />;

  return (
    <div className="user-card">
      <div className="user-card__avatar">
        {props.profileLink ? (
          <Link to={props.profileLink}>{avatar}</Link>
        ) : (
          <Fragment>{avatar}</Fragment>
        )}
      </div>
      <div className="user-card__info">
        <div className="user-card__name">
          {props.profileLink ? (
            <Link to={props.profileLink}>{props.userName}</Link>
          ) : (
            <Fragment>{props.userName}</Fragment>
          )}
        </div>

        {props.accountName && (
          <div className="user-card__account">@{props.accountName}</div>
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
  isRated: PropTypes.bool,
  userName: PropTypes.string,
  accountName: PropTypes.string,
  profileLink: PropTypes.string,
  avatarUrl: PropTypes.string,
  avatarSize: PropTypes.string,
};

UserCard.defaultProps = {
  squareAvatar: false,
  isRated: false,
  userName: 'John Don',
  avatarUrl: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
};

export default UserCard;
