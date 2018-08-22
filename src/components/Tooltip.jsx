import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ children }) => (
  <div className="tooltip">
    <div className="tooltip__arrow" />
    <div className="tooltip__content">{children}</div>
  </div>
);

Tooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Tooltip;
