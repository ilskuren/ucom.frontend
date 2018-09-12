import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import Rate from './Rate';
import FollowButton from './FollowButton';

const renderProfilesRow = ({
  id, userName, accountName, avatarUrl, rate, profileLink, follow,
}) => (
  <div className="profiles-list__row" key={id}>
    <div className="profiles-list__user">
      <UserCard
        userName={userName}
        accountName={accountName}
        avatarUrl={avatarUrl}
        profileLink={profileLink}
        className="user-card_text_left"
      />
    </div>
    <div className="profiles-list__info">
      <Rate value={rate} className="rate_profile rate_right rate_color_black" />

      <div className="profiles-list__button">
        <FollowButton
          follow={follow}
          userId={id}
        />
      </div>
    </div>
  </div>
);

const ProfilesList = props => (
  <div className="profiles-list">
    <div className="profiles-list__header">
      <h3>{props.title}</h3>
    </div>
    {props.users.map(renderProfilesRow)}
  </div>
);

renderProfilesRow.propTypes = {
  id: PropTypes.number,
  userName: PropTypes.string,
  accountName: PropTypes.string,
  avatarUrl: PropTypes.string,
  rate: PropTypes.string,
  profileLink: PropTypes.string,
  follow: PropTypes.bool,
};

ProfilesList.propTypes = {
  title: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object),
};

ProfilesList.defaultTypes = {
  title: 'Followers',
};

export default ProfilesList;
