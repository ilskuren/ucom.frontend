import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import Button from './Button';
import Rate from './Rate';

const users = Array.from({ length: 7 }, () => (
  {
    userName: 'James Ambrose',
    accountName: 'apple_inc',
    avatarUrl: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
    rate: 10800,
  }));

// In production you should remove randomNumber
const renderProfilesRow = ({
  userName, accountName, avatarUrl, rate,
}, index) => {
  const conditionForDemonstration = false;
  return (
    <div className="profiles-list__row" key={index}>
      <div className="profiles-list__user">
        <UserCard
          userName={userName}
          accountName={accountName}
          avatarUrl={avatarUrl}
        />
      </div>
      <div className="profiles-list__info">
        <Rate value={rate} className="rate_profile rate_right" />
        <div className="profiles-list__button">
          <Button
            text={conditionForDemonstration ? 'Following' : 'Follow'}
            size="small"
            theme="transparent"
            isStretched
            withCheckedIcon={conditionForDemonstration}
          />
        </div>
      </div>
    </div>
  );
};

const ProfilesList = () => (
  <div className="profiles-list">
    <div className="profiles-list__header">
      <h3>Followers</h3>
    </div>
    {users.map(renderProfilesRow)}
  </div>
);

renderProfilesRow.propTypes = {
  userName: PropTypes.string,
  accountName: PropTypes.string,
  avatarUrl: PropTypes.string,
  rate: PropTypes.string,
};

export default ProfilesList;
