import React from 'react';
import cn from 'classnames';
import FollowersTable from '../../components/FollowersTable';

const users = Array.from({ length: 5 }, () => (
  {
    userCardData: {
      userName: 'Jason Born',
      accountName: 'apple_inc',
      avatarUrl: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
    },
    followers: 8923,
    trustedBy: 8923,
    rate: 10800,
  }));

const MyProfileFollowersPage = () => (
  <div className="followers-list">
    <div className="followers-list__filters">
      <div className={cn(
        'followers-list__filters-element',
        { 'followers-list__filters-element_active': true },
        )}
      >All
      </div>
      <div className="followers-list__filters-element">Trusted</div>
      <div className="followers-list__filters-element">Follow back</div>
    </div>
    <FollowersTable users={users} />
  </div>
);

export default MyProfileFollowersPage;
