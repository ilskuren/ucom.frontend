import React from 'react';
import PropTypes from 'prop-types';

const Switcher = ({ isChecked, withoutLabels }) => (
  <div className="switcher">
    <label className="switcher__label">
      {!withoutLabels && <span className="switcher__label-off">Off</span>}
      <input className="switcher__input" type="checkbox" value={isChecked} />
      <div className="switcher__checkmark">
        <div className="switcher__toggle-background" />
        <div className="switcher__toggle" />
      </div>
      {!withoutLabels && <span className="switcher__label-off">On</span>}
    </label>
  </div>
);

Switcher.propTypes = {
  isChecked: PropTypes.bool,
  withoutLabels: PropTypes.bool,
};

Switcher.defaultProps = {
  isChecked: false,
};

export default Switcher;
