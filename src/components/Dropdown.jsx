import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UserOption from './UserOption';

const setUserOption = (option, length, optionIndex) => {
  if (typeof option === 'string') {
    return option;
  }
  const isLastIndex = length - 1 === optionIndex;

  return (
    <UserOption
      name="bruce wayne"
      linkColor={!isLastIndex ? 'red' : ''}
      linkText={isLastIndex ? 'Invite sent' : 'Invite'}
    />
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
          {options.map((option, optionIndex) => (
            <div className={dropdownOptionClass} key={optionIndex}>
              {isUserOption ? setUserOption(option, options.length, optionIndex) : option}
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
