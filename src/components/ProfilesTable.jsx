import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Button from '../components/Button';
import UserCard from '../components/UserCard';

const renderProfilesTableRow = ({
  profileCardData: { profileName, accountName, avatarUrl }, rate, views, comments,
}, index) => (
  <div className="followers-table__row" key={index}>
    <div className="followers-table__user">
      <div className="followers-table__index">
        <span>#</span>{index + 1}
      </div>
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

const renderPromoRow = promo => (
  <div className="followers-table__row followers-table__row_promo">
    <h3>{promo.title}</h3>
    <Button
      text="Learn more"
      size="medium"
      theme="transparent"
    />
  </div>
);


const renderProfilesTableHeader = titles => (
  <div className="followers-table__header">
    <div className="followers-table__user">
      <div className="followers-table__index">
        #
      </div>
      <div className="followers-table__column-name">name</div>
    </div>
    <div className="followers-table__numbers followers-table__numbers_">
      {titles.map((title, index) => (
        <div key={index} className="followers-table__column-name">{title}<div className="followers-table__triangle" /></div>
      ))}
    </div>
  </div>
);

const ProfilesTable = ({ profiles, titles, promo }) => (
  <div className={cn('followers-table', 'followers-table_without-button')}>
    {renderProfilesTableHeader(titles)}
    {profiles.slice(0, 4).map(renderProfilesTableRow)}
    {promo && renderPromoRow(promo)}
    {profiles.slice(5).map(renderProfilesTableRow)}
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
  promo: PropTypes.shape({ title: PropTypes.string, link: PropTypes.string }),
};

export default ProfilesTable;
