import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Switcher = ({
  isChecked, labels, textColor, onChange,
}) => (
  <div className={cn('switcher', { [`switcher_text-color_${textColor}`]: Boolean(textColor) })}>
    <label className="switcher__label">
      <span className="switcher__label-off">
        {labels && labels.length ? labels[0] : 'Off'}
      </span>
      <input
        type="checkbox"
        className="switcher__input"
        value={isChecked}
        checked={isChecked}
        onChange={(e) => {
          if (typeof onChange === 'function') {
            onChange(e.target.checked);
          }
        }}
      />
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
  onChange: PropTypes.func,
};

Switcher.defaultProps = {
  isChecked: false,
};

export default Switcher;
