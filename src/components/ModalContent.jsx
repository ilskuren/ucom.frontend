import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TextInput from './TextInput';
import CloseIcon from './Icons/Close';
import SearchIcon from './Icons/Search';

const ModalContent = props => (
  <div className="modal-content">
    <div className="modal-content__close" role="presentation" onClick={props.onClickClose}><CloseIcon /></div>
    {props.onSearchChange && (
      <div className="modal-content__search">
        <SearchIcon />
        <div className="modal-content__input">
          <TextInput placeholder="Search for people" value={props.searchValue} onChange={props.onSearchChange} />
        </div>
      </div>
    )}
    <div className={cn('modal-content__main', { 'modal-content__main_no-search': !props.onSearchChange })}>
      {props.children}
    </div>
  </div>
);

ModalContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClickClose: PropTypes.func,
  onSearchChange: PropTypes.func,
  searchValue: PropTypes.string,
};

export default ModalContent;
