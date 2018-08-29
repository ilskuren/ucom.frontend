import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Switcher = ({ isChecked, labels, textColor }) => (
  <div className={cn('switcher', { [`switcher_text-color_${textColor}`]: Boolean(textColor) })}>
    <label className="switcher__label">
      <span className="switcher__label-off">
        {labels && labels.length ? labels[0] : 'Off'}
      </span>
      <input className="switcher__input" type="checkbox" value={isChecked} />
      <div className="switcher__checkmark">
        <div className="switcher__toggle-background" />
        <div className="switcher__toggle" />
      </div>
      <span className="switcher__label-off">
        {labels && labels.length ? labels[1] : 'On'}
      </span>
    </label>
  </div>
);

Switcher.propTypes = {
  isChecked: PropTypes.bool,
  textColor: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
};

Switcher.defaultProps = {
  isChecked: false,
};

export default Switcher;
