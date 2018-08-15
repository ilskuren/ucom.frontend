import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({
  label, value, placeholder, rows,
}) => (
  <div className="textarea">
    { label && <label className="textarea__label">{label}</label> }
    <textarea
      className="textarea__text"
      value={value}
      rows={rows}
      placeholder={placeholder}
    />
  </div>
);

Textarea.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
};

export default Textarea;
