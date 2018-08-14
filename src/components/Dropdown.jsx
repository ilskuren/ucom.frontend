import React from 'react';

const Dropdown = ({
  text, label, error, options, isOpened, onClose,
}) => (
  <div className="dropdown">
    <div className="dropdown__label">{label}</div>
    <div className={`dropdown__select ${options && isOpened ? 'dropdown__select_opened' : ''}`}>
      <div className="dropdown__text">{text}</div>
      <div className="dropdown__arrow" />
      <div className={`dropdown__options ${options && isOpened ? 'dropdown__options_opened' : ''}`}>
        {options.map((option, i) => (
          <div className="dropdown__option" key={i} onClick={onClose}>
            {option}
          </div>
        ))}
      </div>
    </div>
    <div className="dropdown__error">{error}</div>
  </div>
);

export default Dropdown;
