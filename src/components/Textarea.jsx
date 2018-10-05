import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Textarea = ({
  label, value, placeholder, rows, onChange, className, error, ...rest
}) => (
  <div className={cn(
      'textarea',
      { 'textarea_error': !!error },
      className,
    )}
  >
    { label && <label className="textarea__label">{label}</label> }
    <textarea
      className="textarea__text"
      value={value === null ? '' : value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => {
        if (typeof onChange === 'function') {
          onChange(e.target.value);
        }
      }}
      {...rest}
    />
    {error && <div className="textarea__error">{error}</div>}
  </div>
);

Textarea.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default Textarea;
