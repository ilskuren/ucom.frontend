import React from 'react';
import PropTypes from 'prop-types';
import UserCard from '../components/UserCard';
import Button from '../components/Button';

const renderFollowersTableRow = ({
  userCardData: { userName, accountName, avatarUrl }, rate, followers, trustedBy,
}) => (
  <div className="followers-table__row">
    <div className="followers-table__user">
      <UserCard
        userName={userName}
        accountName={accountName}
        avatarUrl={avatarUrl}
      />
    </div>
    <div className="followers-table__numbers">
      {followers}
    </div>
    <div className="followers-table__numbers">
      {trustedBy}
    </div>
    <div className="rate">
      <div className="rate__value">
        {rate}
        <span class="rate__degree">°</span>
      </div>
    </div>
    <div className="followers-table__button">
      <Button text="Follow" size="medium" theme="transparent" isStretched />
    </div>
  </div>
);

const FollowersTable = ({ users }) => (
  <div className="followers-table">

    {users.map(renderFollowersTableRow)}
    <div className="followers-table__row followers-table__row_load-more">
      load more
    </div>
  </div>
);

const renderFollowersTableHeader = () => (
  <div className="followers-table__header">
    <div className="followers-table__name">name</div>
    <div className="followers-table__followers">name</div>
    <div className="followers-table__trusted-by">name</div>
    <div className="followers-table__rate">name</div>
  </div>
)

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
