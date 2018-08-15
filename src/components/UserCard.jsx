import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const UserCard = props => (
  <div className="user-card">
    <div className="user-card__avatar">
      <Avatar square={props.squareAvatar} src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
    </div>
    <div className="user-card__info">
      <div className="user-card__name">TUDO</div>
      <div className="user-card__account">@apple_inc</div>
    </div>
    <div className="user-card__rate">
      <div className="rate">
        <div className="rate__value">9 200 <span className="rate__degree">°</span></div>
        <div className="rate__label">Rate</div>
      </div>
    </div>
  </div>
);

UserCard.propTypes = {
  squareAvatar: PropTypes.bool,
};

UserCard.defaultProps = {
  squareAvatar: false,
};

export default UserCard;
