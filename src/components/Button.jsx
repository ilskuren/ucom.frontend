import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = (props) => {
  const btnClass = classNames('button', {
    [`button_theme_${props.theme}`]: Boolean(props.theme),
    [`button_size_${props.size}`]: true,
    button_disabled: props.isDisabled,
    button_stretched: props.isStretched,
  });

  return (
    <button className={btnClass}>
      {props.text}
    </button>
  );
};

Button.propTypes = {
  theme: PropTypes.string,
  size: PropTypes.string,
  isDisabled: PropTypes.bool,
  text: PropTypes.string,
};

Button.defaultProps = {
  isDisabled: false,
  text: '',
};

export default Button;
