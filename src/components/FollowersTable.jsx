import React from 'react';
import PropTypes from 'prop-types';
import UserCard from '../components/UserCard';
import Button from '../components/Button';

const renderFollowerTableRow = ({
  userCardData: { userName, accountName, avatarUrl }, rate, followers, trustedBy,
}) => (
  <div className="followers-table__row">
    <UserCard
      userName={userName}
      accountName={accountName}
      avatarUrl={avatarUrl}
    />
    <div className="followers-table__number-followers">
      {followers}
    </div>
    <div className="followers-table__number-trustedBy">
      {trustedBy}
    </div>
    <div className="rate">
      <div className="rate__value">
        {rate}
        <span class="rate__degree">°</span>
      </div>
    </div>
    <div className="followers-table__row">
      <Button text="Follow" size="medium" theme="transparent" />
    </div>
  </div>
);

const FollowersTable = ({ users }) => (
  <div className="followers-table">
    {users.map(renderFollowerTableRow)}
  </div>
);

renderFollowerTableRow.propTypes = {
  userCardData: PropTypes.shape({
    userName: PropTypes.string,
    accountName: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
  followers: PropTypes.number.isRequired,
  trustedBy: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
};

FollowersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    userCardData: PropTypes.shape({
      userName: PropTypes.string,
      accountName: PropTypes.string,
      avatarUrl: PropTypes.string,
    }).isRequired,
    followers: PropTypes.number.isRequired,
    trustedBy: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
  })).isRequired,
};

export default FollowersTable;
