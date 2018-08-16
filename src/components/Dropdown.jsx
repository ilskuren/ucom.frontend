import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from './Avatar';

const setUserOption = (option, length, i) => {
  if (typeof option === 'string') {
    return option;
  }
  const isLastOption = length === i + 1; // for presentation purposes
  const userOptionClass = classNames('user-option', {
    'user-option_link-color_red': !isLastOption,
  });

  return (
    <div className="user-option">
      <div className="toolbar">
        <div className="toolbar__main">
          <div className="inline">
            <span className="inline__item">
              <Avatar
                src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg"
              />
            </span>
            <span className="inline__item">
              <span className="user-option__name">
                {option.name}
              </span>
            </span>
          </div>
        </div>
        <div className="toolbar__side">
          <span className="inline__item">
            <span className={userOptionClass}>
              {isLastOption ? 'Invite sent' : 'Invite'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

const Dropdown = ({
  value, label, options, subtext, isOpened,
}) => {
  const isUserOption = options.every(option => typeof option !== 'string');
  const dropdownOptionsClass = classNames(
    'dropdown__options',
    {
      dropdown__options_opened: options && isOpened,
    },
  );
  const dropdownOptionClass = classNames(
    'dropdown__option',
    {
      dropdown__option_type_user: isUserOption,
    },
  );
  const dropdownSelectClass = classNames(
    'dropdown__select',
    {
      dropdown__select_opened: options && isOpened,
    },
  );

  return (
    <div className="dropdown">
      { label && <div className="dropdown__label">{label}</div> }
      <div className={dropdownSelectClass}>
        <div className="dropdown__value">{value}</div>
        <div className="dropdown__arrow" />
        <div className={classNames(dropdownOptionsClass)}>
          {options.map((option, i) => (
            <div className={dropdownOptionClass} key={i}>
              {isUserOption ? setUserOption(option, options.length, i) : option}
            </div>
          ))}
        </div>
      </div>
      { subtext && <div className="dropdown__subtext">{subtext}</div>}
    </div>
  );
};

Dropdown.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  subtext: PropTypes.string,
  isOpened: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  ]),
};

export default Dropdown;
