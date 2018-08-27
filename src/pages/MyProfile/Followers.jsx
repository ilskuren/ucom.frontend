import React from 'react';
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

const FollowersPage = () => (
  <div className="followers">
    <FollowersTable users={users} />
  </div>
);

export default FollowersPage;
