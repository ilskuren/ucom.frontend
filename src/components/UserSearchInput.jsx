import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { components } from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import UserOption from './UserOption';
import Close from './Icons/Close';
import { searchUsers } from '../api';
import { getUserName } from '../utils/user';
import { getFileUrl } from '../utils/upload';

const SelectUserOption = props => (
  <components.Option {...props}>
    <UserOption
      name={getUserName(props.data)}
      avatar={getFileUrl(props.data.avatar_filename)}
    />
  </components.Option>
);

const CloseButton = props => (
  <components.MultiValueRemove {...props}>
    <div className="dropdown__multi-value__remove">
      <Close size={9} />
    </div>
  </components.MultiValueRemove>
);

const Control = props => (
  <div
    className={classNames(
      'dropdown__control-wrapper',
      { 'dropdown__control-wrapper_opened': props.selectProps.menuIsOpen },
    )}
  >
    <components.Control {...props} />
  </div>
);

const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <div
      className={classNames(
        'dropdown__arrow',
        { 'dropdown__arrow_up': props.selectProps.menuIsOpen },
      )}
    />
  </components.DropdownIndicator>
);

const Input = props => (
  <div className="dropdown__input-container">
    <components.Input {...props} />
  </div>
);

const UserSearchInput = ({ onChange, value }) => (
  <div className="dropdown">
    <AsyncSelect
      value={value}
      isMulti
      isSearchable
      isClearable={false}
      placeholder="Find people"
      className="dropdown"
      classNamePrefix="dropdown"
      loadOptions={searchUsers}
      getOptionLabel={data => getUserName(data)}
      getOptionValue={data => data.id}
      components={{
        MultiValueRemove: CloseButton,
        Control,
        DropdownIndicator,
        Option: SelectUserOption,
        Input,
      }}
      onChange={(options) => {
        if (typeof onChange === 'function') {
          onChange(options);
        }
      }}
    />
  </div>
);

UserSearchInput.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};

export default UserSearchInput;
