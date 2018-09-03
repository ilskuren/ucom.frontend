import React from 'react';
import classNames from 'classnames';
import { components } from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import UserOption from './UserOption';
import Close from './Icons/Close';
import { getUsers } from '../api';
import { getUserName } from '../utils/user';
import { getFileUrl } from '../utils/upload';

const fetchUsers = () => (
  getUsers().then(data => (
    data.map(item => ({
      value: item.id,
      label: getUserName(item),
      avatar: getFileUrl(item.avatar_filename),
    }))
  ))
);

const SelectUserOption = props => (
  <components.Option {...props}>
    <UserOption
      name={props.label}
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

const UserSearchInput = () => (
  <div className="dropdown">
    <AsyncSelect
      isMulti
      isSearchable
      isClearable={false}
      placeholder="Find people"
      className="dropdown"
      classNamePrefix="dropdown"
      loadOptions={fetchUsers}
      components={{
        MultiValueRemove: CloseButton,
        Control,
        DropdownIndicator,
        Option: SelectUserOption,
      }}
    />
  </div>
);

export default UserSearchInput;
