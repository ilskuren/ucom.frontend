import React from 'react';
import PropTypes from 'prop-types';

const Switcher = ({ isChecked }) => (
  <div className="switcher">
    <label className="switcher__label">
      <span className="switcher__label-off">Off</span>
      <input className="switcher__input" type="checkbox" value={isChecked} />
      <div className="switcher__checkmark">
        <div className="switcher__toggle-background" />
        <div className="switcher__toggle" />
      </div>
      <span className="switcher__label-on">On</span>
    </label>
  </div>
);

Switcher.propTypes = {
  isChecked: PropTypes.bool,
};

Switcher.defaultProps = {
  isChecked: false,
};

export default Switcher;
