import React from 'react';
import PropTypes from 'prop-types';
// import UserCard from '../components/UserCard';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import FollowersAmount from '../components/FollowersAmount';

const renderRow = () => {
  const randomNumber = Math.floor(Math.random() * 10000) + 1;
  const conditionForDemonstration = randomNumber % 2 === 0;
  return (
    <div className="my-profile-items__row">
      <div className="my-profile-items__row-left-side">
        <div className="my-profile-items__row-left-top-side">
          <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" size="80px" square />
          <div className="my-profile-items__text-content">
            <div className="my-profile-items__item-name">TyDo</div>
            <div className="my-profile-items__description">Our mission is to make better world for us.</div>
            <div className="my-profile-items__powered-by">
              <div className="inline">
                <div className="inline__item">
                  <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" size="xxsmall" />
                </div>
                <div className="inline__item my-profile-items__powered-by_style">Powered by EOS</div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-profile-items__row-left-bottom-side">
          <div className="my-profile-items__following-button">
            <Button
              text={conditionForDemonstration ? 'Following' : 'Follow'}
              size="medium"
              theme="transparent"
              isStretched
              withCheckedIcon={conditionForDemonstration}
            />
          </div>
        </div>
      </div>
      <div className="my-profile-items__row-right-side">
        <div className="my-profile-items__row-right-top-side">
          <div className="my-profile-items__user-rating">
            <div className="my-profile-items__user-position">#123</div>
            <div className="my-profile-items__user-rate">5 900</div>
            <div className="my-profile-items__user-rate-title">RATE</div>
          </div>
        </div>
        <div className="my-profile-items__row-right-bottom-side">
          <FollowersAmount status="followers" />
          <FollowersAmount status="trusted by" />
          <FollowersAmount status="joined" />
        </div>
      </div>
    </div>
  );
};

const MyProfileItems = ({ bottomLabel }) => (
  <div className="my-profile-items">
    {Array.from({ length: 5 }).map(renderRow)}
    <div className="my-profile-items__row my-profile-items__row_create-new">
      {bottomLabel}
    </div>
  </div>
);

MyProfileItems.propTypes = {
  bottomLabel: PropTypes.string,
};

export default MyProfileItems;
