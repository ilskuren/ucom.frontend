import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UserOption from './UserOption';

const setUserOption = (option, length, optionIndex) => {
  if (!option.label) {
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
  value, label, options, subtext, isOpened, isSearchable, placeholder, withTags,
}) => {
  const isUserOption = options.every(option => !option.label);
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

  if (isUserOption) {
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
  }

  return (
    <div className="dropdown">
      { label && <div className="dropdown__label">{label}</div> }
      <Select
        options={options}
        isMulti={withTags}
        placeholder={placeholder || ''}
        classNamePrefix="dropdown"
        isSearchable={isSearchable}
        isClearable={false}
      />
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
  withTags: PropTypes.bool,
  isSearchable: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  ]),
};

export default Dropdown;
