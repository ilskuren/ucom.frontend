import React from 'react';
import PropTypes from 'prop-types';

const ProfileTooltipContent = ({ title, username, avatar }) => (
  <div className="profile-tooltip-content">
    <img className="profile-tooltip-content__avatar" alt={title} src={avatar} />
    <div className="profile-tooltip-content__info">
      <div className="profile-tooltip-content__title">{title}</div>
      <div className="profile-tooltip-content__username">@{username}</div>
    </div>
  </div>
);

ProfileTooltipContent.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default ProfileTooltipContent;
