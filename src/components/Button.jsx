import React from 'react';

function setDisabledButton(disabled) {
  return disabled ? 'button_disabled' : '';
}

function setButtonTheme(theme) {
  const modifier = 'button_theme';
  switch (theme) {
    case 'red':
      return `${modifier}_red`;
    case 'white':
      return `${modifier}_white`;
    case 'gray':
      return `${modifier}_gray`;
    default:
      return '';
  }
}

const Button = (props) => {
  const size = `button_size_${props.size}`;
  const theme = setButtonTheme(props.theme);
  const disabled = setDisabledButton(props.disabled);

  return (
    <button className={`button ${size} ${theme} ${disabled}`}>
      {props.text}
    </button>
  );
};

export default Button;
