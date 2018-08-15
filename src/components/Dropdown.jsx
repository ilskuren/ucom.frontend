import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Dropdown = ({
  value, label, options, isOpened, subtext,
}) => (
  <div className="dropdown">
    { label && <div className="dropdown__label">{label}</div> }
    <div className={classNames('dropdown__select', { dropdown__select_opened: options && isOpened })}>
      <div className="dropdown__value">{value}</div>
      <div className="dropdown__arrow" />
      <div className={classNames('dropdown__options', { dropdown__options_opened: options && isOpened })}>
        {options.map((option, i) => (
          <div className="dropdown__option" key={i}>
            {option}
          </div>
        ))}
      </div>
    </div>
    { subtext && <div className="dropdown__subtext">{subtext}</div>}
  </div>
);

Dropdown.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  subtext: PropTypes.string,
  isOpened: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
};

export default Dropdown;
