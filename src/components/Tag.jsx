import React from 'react';
import PropTypes from 'prop-types';
import IconClose from './Icons/Close';

const Tag = props => (
  <div className="tag">
    <span className="tag__name">{props.value}</span>
    <span className="tag__icon">
      <IconClose size={props.size} />
    </span>
  </div>
);

Tag.propTypes = {
  value: PropTypes.string,
  size: PropTypes.number,
};

export default Tag;
