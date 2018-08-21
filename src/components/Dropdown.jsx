import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UserOption from './UserOption';
import Tag from './Tag';

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

const renderSearchInput = (value, tags, placeholder) => (
  <div className="dropdown__input-wrapper">
    {
      tags && tags.map((tag, index) => (
        <div key={index} className="dropdown__tag"><Tag value={tag} size={10} /></div>
      ))
    }
    <input
      value={value}
      className="dropdown__input"
      type="text"
      placeholder={placeholder}
    />
  </div>
);

const Dropdown = ({
  value, label, options = [], subtext, isOpened, tags, isSearchable, placeholder,
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
        {isSearchable
          ? renderSearchInput(value, tags, placeholder)
          : <div className="dropdown__value">{value}</div>
        }
        {!isSearchable && <div className="dropdown__arrow" />}
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
  placeholder: PropTypes.string,
  isOpened: PropTypes.bool,
  isSearchable: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  ]),
};

export default Dropdown;
