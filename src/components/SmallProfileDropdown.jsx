import React from 'react';
import PropTypes from 'prop-types';

const SmallProfileDropdown = ({
  avatar, name,
}) => (
  <div className="small-profile-dropdown">
    <img className="small-profile-dropdown__avatar" src={avatar} alt={name} />
    <div className="small-profile-dropdown__name">{name}</div>
    <div className="small-profile-dropdown__tooltip" />
  </div>
);

SmallProfileDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default SmallProfileDropdown;
