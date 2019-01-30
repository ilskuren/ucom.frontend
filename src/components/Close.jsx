import React from 'react';
import IconClose from './Icons/Close';

const Close = props => (
  <div
    className="close"
    role="presentation"
    onClick={() => {
      if (typeof props.onClick === 'function') {
        props.onClick();
      } else {
        window.history.back();
      }
    }}
  >
    <div className="close__inner">
      <div className="close__title">
        Close
      </div>
      <div className="close__icon">
        <IconClose />
      </div>
    </div>
  </div>
);

export default Close;
