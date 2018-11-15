import React from 'react';
import CloseIcon from './Icons/Close';

const ModalContent = props => (
  <div className="modal-content">
    <div
      onClick={props.onClickClose}
      className="modal-content__close"
      role="presentation"
    >
      <CloseIcon />
    </div>

    {props.children}
  </div>
);

export default ModalContent;
