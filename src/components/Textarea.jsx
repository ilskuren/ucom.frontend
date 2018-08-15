import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({
  label, value, placeholder,
}) => (
  <div className="textarea">
    { label && <label className="textarea__label">{label}</label> }
    <textarea
      className="textarea__text"
      value={value}
      placeholder={placeholder}
    />
  </div>
);

Textarea.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Textarea;
