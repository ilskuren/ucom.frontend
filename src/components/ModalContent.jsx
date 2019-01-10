import classNames from 'classnames';
import React, { useRef } from 'react';
import CloseIcon from './Icons/Close';

export default (props) => {
  const el = useRef(null);

  return (
    <div
      ref={el}
      role="presentation"
      className={classNames(
        'modal-content',
        { [`modal-content_${props.mod}`]: Boolean(props.mod) },
      )}
      onClick={(e) => {
        if (e.target === el.current && props.onClickClose) {
          props.onClickClose();
        }
      }}
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
};
