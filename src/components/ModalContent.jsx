import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import CloseIcon from './Icons/Close';
import SearchIcon from './Icons/Search';

const ModalContent = props => (
  <div className="modal-content" role="presentation" onClick={(props.typePopup === 'addPublication') ? props.onClickClose : null}>
    <div className="modal-content__close" role="presentation" onClick={props.onClickClose}>
      <div className="inline">
        {props.closeText && (
          <div className="inline__item">
            <div className="modal-content__close-text">
              {props.closeText}
            </div>
          </div>
        )}
        <div className="inline__item"><CloseIcon /></div>
      </div>
    </div>
    {props.onSearchChange && (
      <div className="modal-content__search">
        <SearchIcon />
        <div className="modal-content__input">
          <TextInput placeholder="Search for people" value={props.searchValue} onChange={props.onSearchChange} />
        </div>
      </div>
    )}
    <div className="modal-content__main">
      {props.children}
    </div>
  </div>
);

ModalContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  closeText: PropTypes.string,
  onClickClose: PropTypes.func,
  onSearchChange: PropTypes.func,
  searchValue: PropTypes.string,
  typePopup: PropTypes.string,
};

export default ModalContent;
