import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const FollowersAmount = ({
  rate = '8 923', status = 'Joined', avatar = 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
}) => (
  <div className="followers-amount">
    <div className="inline inline_small">
      <div className="inline__item">
        <div className="rate rate_followers-amount">
          <div className="rate__value">{rate}</div>
          <div className="rate__label">{status}</div>
        </div>
      </div>
      <div className="inline__item">
        <div className="avatars-list avatars-list_dual">
          <div className="avatars-list__item">
            <Avatar src={avatar} borderWhite size="xsmall" />
          </div>
          <div className="avatars-list__item">
            <Avatar src={avatar} borderWhite size="xsmall" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

FollowersAmount.propTypes = {
  rate: PropTypes.string,
  status: PropTypes.string,
  avatar: PropTypes.string,
};

export default FollowersAmount;
