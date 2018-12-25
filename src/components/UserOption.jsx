import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const UserOption = ({
  name, nickname, linkColor, linkText, avatar,
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
              <Avatar src={avatar} />
            </span>
            <span className="inline__item">
              <span className="user-option__name">
                {name}
              </span>
              <div className="user-option__nickname">
                @{nickname}
              </div>
            </span>
          </div>
        </div>
        {linkText && (
          <div className="toolbar__side">
            <span className="inline__item">
              <a className={linkClass}>
                {linkText}
              </a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

UserOption.propTypes = {
  name: PropTypes.string,
  nickname: PropTypes.string,
  avatar: PropTypes.string,
  linkText: PropTypes.string,
  linkColor: PropTypes.string,
};

export default UserOption;
