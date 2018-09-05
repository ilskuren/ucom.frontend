import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Tooltip = ({ children, className }) => (
  <div className={cn('tooltip', className)}>
    <div className="tooltip__arrow" />
    <div className="tooltip__content">{children}</div>
  </div>
);

Tooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

export default Tooltip;
