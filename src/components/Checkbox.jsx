import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ isChecked, onChange }) => (
  <div className="checkbox-input">
    <label className="checkbox-input__label">
      <input
        type="checkbox"
        className="checkbox-input__input"
        value={isChecked}
        onChange={(e) => {
          if (typeof onChange === 'function') {
            onChange(e.target.checked);
          }
        }}
      />

      <div className="checkbox-input__checkmark" />
    </label>
  </div>
);

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
