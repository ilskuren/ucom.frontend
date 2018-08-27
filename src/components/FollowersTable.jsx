import React from 'react';
import PropTypes from 'prop-types';
import UserCard from '../components/UserCard';
import Button from '../components/Button';

// In production you can remove Math.floor(Math.random() * 10000) + 1
const renderFollowersTableRow = ({
  userCardData: { userName, accountName, avatarUrl }, rate, followers, trustedBy,
}) => (
  <div className="followers-table__row" key={accountName + Math.floor(Math.random() * 10000) + 1}>
    <div className="followers-table__user">
      <UserCard
        userName={userName}
        accountName={accountName}
        avatarUrl={avatarUrl}
      />
    </div>
    <div className="followers-table__numbers">
      <div className="followers-table__number">
        <div className="followers-table__column-name followers-table__column-name_in-row">followers</div>{followers}
      </div>
      <div className="followers-table__number">
        <div className="followers-table__column-name followers-table__column-name_in-row">trusted by</div>{trustedBy}
      </div>
      <div className="followers-table__number">
      <div className="followers-table__column-name followers-table__column-name_in-row">rate</div>
        <div className="rate">
          <div className="rate__value followers-table__mobile-rate-value">
            {rate}
            <span className="rate__degree">°</span>
          </div>
        </div>
      </div>
    </div>
    <div className="followers-table__button">
      <Button text="Follow" size="medium" theme="transparent" isStretched />
    </div>
  </div>
);

const renderFollowersTableHeader = () => (
  <div className="followers-table__header">
    <div className="followers-table__column-name">name</div>
    <div className="followers-table__column-name">followers<div className="followers-table__triangle"/></div>
    <div className="followers-table__column-name">trusted by<div className="followers-table__triangle"/></div>
    <div className="followers-table__column-name">rate<div className="followers-table__triangle"/></div>
  </div>
)

const FollowersTable = ({ users }) => (
  <div className="followers-table">
    {renderFollowersTableHeader()}
    {users.map(renderFollowersTableRow)}
    <div className="followers-table__row followers-table__row_load-more">
      load more
    </div>
  </div>
);

renderFollowersTableRow.propTypes = {
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
