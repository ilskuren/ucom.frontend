import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import UserCard from '../components/UserCard';

const renderProfilesTableRow = ({
  profileCardData: { profileName, accountName, avatarUrl }, rate, views, comments,
}, index) => (
  <div className="followers-table__row" key={index}>
    <div className="followers-table__user">
      <UserCard
        userName={profileName}
        accountName={accountName}
        avatarUrl={avatarUrl}
        sign="#"
        squareAvatar
      />
    </div>
    <div className="followers-table__numbers">
      <div className="followers-table__number">
        <div className="followers-table__column-name followers-table__column-name_in-row">views</div>{views}
      </div>
      <div className="followers-table__number">
        <div className="followers-table__column-name followers-table__column-name_in-row">comments</div>{comments}
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
  </div>
);


const renderProfilesTableHeader = titles => (
  <div className="followers-table__header">
    <div className="followers-table__column-name">name</div>
    {titles.map((title, index) => (
      <div key={index} className="followers-table__column-name">{title}<div className="followers-table__triangle" /></div>
    ))}
  </div>
);

const ProfilesTable = ({ profiles, titles }) => (
  <div className={cn('followers-table', 'followers-table_without-button')}>
    {renderProfilesTableHeader(titles)}
    {profiles.map(renderProfilesTableRow)}
  </div>
);

const profilesData = {
  profileCardData: PropTypes.shape({
    eventName: PropTypes.string,
    accountName: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
  views: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
};

renderProfilesTableRow.propTypes = profilesData;

ProfilesTable.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape(profilesData)),
  titles: PropTypes.arrayOf(PropTypes.string),
};

export default ProfilesTable;
