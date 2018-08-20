import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ children, isActive }) => (
  <div className="tooltip">
    <div className="tooltip__arrow" />
    <div className="tooltip__content">{children}</div>
  </div>
);

Tooltip.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Tooltip.defaultProps = {
  isActive: false,
};

export default Tooltip;
