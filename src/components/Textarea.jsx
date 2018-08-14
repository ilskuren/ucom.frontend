import React from 'react';

const Textarea = ({
  label, value, onChange, placeholder,
}) => (
  <div className="textarea">
    { label && <label className="textarea__label">{label}</label> }
    <textarea
      className="textarea__text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default Textarea;
