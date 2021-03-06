import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';

export default (props) => {
  const el = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      ref={el}
      role="presentation"
      className={classNames(
        'popup',
        { [`popup_${props.mod}`]: Boolean(props.mod) },
      )}
      onClick={(e) => {
        if (e.target === el.current && props.onClickClose) {
          props.onClickClose();
        }
      }}
    >
      {props.children}
    </div>
  );
};
