import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({
  label, value, placeholder, rows, onChange,
}) => (
  <div className="textarea">
    { label && <label className="textarea__label">{label}</label> }
    <textarea
      className="textarea__text"
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => {
        if (typeof onChange === 'function') {
          onChange(e.target.value);
        }
      }}
    />
  </div>
);

Textarea.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  onChange: PropTypes.func,
};

export default Textarea;
