import React from 'react';
import classNames from 'classnames';

const Dropdown = ({
  text, label, error, options, isOpened, onClose,
}) => (
  <div className="dropdown">
    <div className="dropdown__label">{label}</div>
    <div className={classNames('dropdown__select', { dropdown__select_opened: options && isOpened })}>
      <div className="dropdown__text">{text}</div>
      <div className="dropdown__arrow" />
      <div className={classNames('dropdown__options', {dropdown__options_opened: options && isOpened})}>
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
