import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ isChecked }) => (
  <div className="checkbox-input">
    <label className="checkbox-input__label">
      <input className="checkbox-input__input" type="checkbox" value={isChecked} />
      <div className="checkbox-input__checkmark" />
    </label>
  </div>
);

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
};

export default Checkbox;
