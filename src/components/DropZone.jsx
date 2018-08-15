import React from 'react';
import PropTypes from 'prop-types';

const DropZone = props => (
  <div className="drop-zone">
    <span className="drop-zone__text">{props.text}</span>
  </div>
);

DropZone.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DropZone;
