import React from 'react';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import UserOption from './UserOption';
import Close from './Icons/Close';

const SelectUserOption = props => (
  <components.Option {...props}>
    <UserOption
      name={props.label}
      linkIsActive={props.data.isEnvited}
      avatar="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg"
    />
  </components.Option>
);

const CloseButton = props => (
  <components.MultiValueRemove {...props}>
    <div className="dropdown__multi-value__remove">
      <Close size={8} />
    </div>
  </components.MultiValueRemove>
);

const Dropdown = ({
  label, options, subtext, isMulti, isSearchable, placeholder, isUserOptions,
}) => (
  <div className="dropdown">
    { label && <div className="dropdown__label">{label}</div> }
    <Select
      options={options}
      isMulti={isMulti}
      placeholder={placeholder || ''}
      className="dropdown"
      classNamePrefix="dropdown"
      isSearchable={isSearchable}
      isClearable={false}
      components={{
        MultiValueRemove: CloseButton,
        [isUserOptions ? 'Option' : '']: SelectUserOption,
      }}
    />
    { subtext && <div className="dropdown__subtext">{subtext}</div>}
  </div>
);

SelectUserOption.propTypes = {
  label: PropTypes.string,
  avatar: PropTypes.string,
  data: PropTypes.shape({
    isEnvited: PropTypes.bool,
  }),
};

Dropdown.propTypes = {
  label: PropTypes.string,
  subtext: PropTypes.string,
  placeholder: PropTypes.string,
  isUserOptions: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  ]),
};

export default Dropdown;
