import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const UserOption = ({
  name, linkIsActive, avatar,
}) => {
  const linkClass = classNames('user-option__link', {
    'user-option__link_color_red': Boolean(!linkIsActive),
  });

  return (
    <div className="user-option">
      <div className="toolbar toolbar_responsive">
        <div className="toolbar__main">
          <div className="inline">
            <span className="inline__item">
              <Avatar
                src={avatar}
              />
            </span>
            <span className="inline__item">
              <span className="user-option__name">
                {name}
              </span>
            </span>
          </div>
        </div>
        <div className="toolbar__side">
          <span className="inline__item">
            <a className={linkClass}>
              {linkIsActive ? 'Invite sent' : 'Invite'}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

UserOption.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  linkIsActive: PropTypes.bool,
};

export default UserOption;
