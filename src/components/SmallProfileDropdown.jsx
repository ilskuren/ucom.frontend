import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Tooltip from './Tooltip';
import ProfileTooltipContent from './ProfileTooltipContent';

const SmallProfileDropdown = ({
  avatar, name, isActive, companyAvatar, companyTitle, companyName,
}) => (
  <div className="small-profile-dropdown">
    <img className="small-profile-dropdown__avatar" src={avatar} alt={name} />
    <div className="small-profile-dropdown__name">{name}</div>
    <div className={cn(
      'small-profile-dropdown__company',
      {
        'small-profile-dropdown__company_active': isActive,
      },
      )}
    >
      <div className="small-profile-dropdown__arrow" />
      <div className="small-profile-dropdown__tooltip">
        <Tooltip>
          <ProfileTooltipContent
            avatar={companyAvatar}
            title={companyTitle}
            username={companyName}
          />
        </Tooltip>
      </div>
    </div>
  </div>
);

SmallProfileDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  companyAvatar: PropTypes.string.isRequired,
  companyTitle: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

SmallProfileDropdown.defaultProps = {
  isActive: false,
};

export default SmallProfileDropdown;
