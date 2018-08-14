import React from 'react';
import classNames from 'classnames';

const Button = (props) => {
  const btnClass = classNames('button', {
    [`button_theme_${props.theme}`]: Boolean(props.theme),
    [`button_size_${props.size}`]: true,
    button_disabled: props.isDisabled,
  });

  return (
    <button className={btnClass}>
      {props.text}
    </button>
  );
};

export default Button;
