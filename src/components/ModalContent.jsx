import classNames from 'classnames';
import React from 'react';
import CloseIcon from './Icons/Close';

export default props => (
  <div
    className={classNames(
      'modal-content',
      { [`modal-content_${props.mod}`]: Boolean(props.mod) },
    )}
  >
    {props.onClickClose &&
      <div
        onClick={props.onClickClose}
        className="modal-content__close"
        role="presentation"
      >
        <CloseIcon />
      </div>
    }

    <div className="modal-content__inner">
      {props.children}
    </div>
  </div>
);
