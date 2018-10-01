import humps from 'lodash-humps';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { components } from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import UserCard from './UserCard';
import Close from './Icons/Close';
import api from '../api';
import { getUserName } from '../utils/user';
import { getFileUrl } from '../utils/upload';

const SelectUserOption = props => (
  <components.Option {...props}>
    <UserCard
      squareAvatar
      roundedAvatar
      userName={getUserName(props.data)}
      avatarUrl={getFileUrl(humps(props.data).avatarFilename)}
      accountName={props.data.accountName}
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

const NoOptionsMessage = props => (
  <div
    role="presentation"
    className="dropdown__no-options"
    onClick={() => {
      if (typeof props.selectProps.onClickAddExternal === 'function') {
        props.selectProps.onClickAddExternal();
      }
    }}
  >
    ADD EXTERNAL
  </div>
);

const Input = props => (
  <div className="dropdown__input-container">
    <components.Input {...props} />
  </div>
);

const CommunitiesSearch = props => (
  <div className="dropdown">
    <AsyncSelect
      value={props.value}
      isMulti
      isSearchable
      isClearable={false}
      placeholder={props.placeholder}
      className="dropdown"
      classNamePrefix="dropdown"
      loadOptions={api.searchUsers}
      getOptionLabel={data => getUserName(data)}
      getOptionValue={data => data.id}
      onClickAddExternal={props.onClickAddExternal}
      components={{
        MultiValueRemove: CloseButton,
        Control,
        DropdownIndicator,
        Option: SelectUserOption,
        Input,
        NoOptionsMessage,
      }}
      onChange={(options) => {
        if (typeof props.onChange === 'function') {
          props.onChange(options);
        }
      }}
    />
  </div>
);

CommunitiesSearch.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

CommunitiesSearch.defaultTypes = {
  placeholder: 'Find people',
};

export default CommunitiesSearch;
