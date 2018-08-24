import React from 'react';
import Avatar from './Avatar';

const FollowersAmount = () => (
  <div className="post-card__users">
    <div className="inline">
      <div className="inline__item">
        <div className="rate">
          <div className="rate__value">354</div>
          <div className="rate__label">Comments</div>
        </div>
      </div>
      <div className="inline__item">
        <div className="rate">
          <div className="rate__value">8 923</div>
          <div className="rate__label">Joined</div>
        </div>
      </div>
      <div className="inline__item post-card__joined">
        <div className="avatars-list avatars-list_shifted">
          <div className="avatars-list__item">
            <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
          </div>
          <div className="avatars-list__item">
            <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
          </div>
          <div className="avatars-list__item">
            <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FollowersAmount;
