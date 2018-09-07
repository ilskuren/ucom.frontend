import React from 'react';
import UnAuthTable from './UnAuth/UnAuthTable';
import av1 from '../static/avatars/1.png';
import av2 from '../static/avatars/2.png';
import av3 from '../static/avatars/3.png';
import av4 from '../static/avatars/4.png';
import av5 from '../static/avatars/5.png';
import av6 from '../static/avatars/6.png';
import av7 from '../static/avatars/7.png';
import av8 from '../static/avatars/8.png';

const organizations = [
  {
    profileCardData: {
      profileName: 'Walmart',
      accountName: 'apple_inc',
      avatarUrl: av1,
    },
    joined: 10231,
    followers: 8923,
    trustedBy: 8923,
    rate: 12800,
  },
  {
    profileCardData: {
      profileName: 'Exxon Mobil',
      accountName: 'apple_inc',
      avatarUrl: av2,
    },
    joined: 8923,
    followers: 8923,
    trustedBy: 8923,
    rate: 12800,
  },
  {
    profileCardData: {
      profileName: 'Berkshire Hathaway',
      accountName: 'apple_inc',
      avatarUrl: av3,
    },
    joined: 7342,
    followers: 8923,
    trustedBy: 8923,
    rate: 12800,
  },
  {
    profileCardData: {
      profileName: 'UnitedHealth Group',
      accountName: 'apple_inc',
      avatarUrl: av4,
    },
    joined: 6234,
    followers: 8923,
    trustedBy: 8923,
    rate: 12800,
  },
  {
    profileCardData: {
      profileName: 'McKesson',
      accountName: 'apple_inc',
      avatarUrl: av5,
    },
    joined: 5133,
    followers: 8923,
    trustedBy: 8923,
    rate: 12800,
  },
  {
    profileCardData: {
      profileName: 'CVS Health',
      accountName: 'apple_inc',
      avatarUrl: av6,
    },
    joined: 4142,
    followers: 8923,
    trustedBy: 8923,
    rate: 12800,
  },
  {
    profileCardData: {
      profileName: 'Exxon Mobil',
      accountName: 'apple_inc',
      avatarUrl: av7,
    },
    joined: 3233,
    followers: 8923,
    trustedBy: 8923,
    rate: 12800,
  },
  {
    profileCardData: {
      profileName: 'Exxon Mobil',
      accountName: 'apple_inc',
      avatarUrl: av8,
    },
    joined: 900,
    followers: 8923,
    trustedBy: 8923,
    rate: 12800,
  },
];

const OrganizationsPage = () => (
  <div className="content">
    <div className="content__inner">
      <UnAuthTable
        title="Organizations"
        tableTitles={['joined', 'followers', 'trusted by', 'rate']}
        onFilterClick={() => true}
        textInMiddle="How to Create Organization?"
        tableData={organizations}
        stickyBottom
        withPagination
        isIndexed
      />
    </div>
  </div>
);

export default OrganizationsPage;
