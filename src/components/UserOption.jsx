import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const UserOption = ({
  name, linkText, linkColor,
}) => {
  const linkClass = classNames('user-option__link', {
    [`user-option__link_color_${linkColor}`]: Boolean(linkColor),
  });

  return (
    <div className="user-option">
      <div className="toolbar toolbar_responsive">
        <div className="toolbar__main">
          <div className="inline">
            <span className="inline__item">
              <Avatar
                src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg"
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
              {linkText}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

UserOption.propTypes = {
  name: PropTypes.string,
  linkColor: PropTypes.string,
  linkText: PropTypes.string,
};

export default UserOption;
