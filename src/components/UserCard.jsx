import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const UserCard = props => (
  <div className="user-card">
    <div className="user-card__avatar">
      <Avatar square={props.squareAvatar} src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
    </div>
    <div className="user-card__info">
      <div className="user-card__name">TUDO</div>
      <div className="user-card__account">@apple_inc</div>
    </div>
    { props.isRated &&
      <div className="user-card__rate">
        <div className="rate">
          <div className="rate__value">9 200 <span className="rate__degree">°</span></div>
          <div className="rate__label">Rate</div>
        </div>
      </div> }
  </div>
);

UserCard.propTypes = {
  squareAvatar: PropTypes.bool,
  isRated: PropTypes.bool,
};

UserCard.defaultProps = {
  squareAvatar: false,
  isRated: false,
};

export default UserCard;
