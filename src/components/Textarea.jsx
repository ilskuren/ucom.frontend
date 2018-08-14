import React from 'react';

const Textarea = ({
  label, value, onChange,
}) => (
  <div className="textarea">
    { label && <label className="textarea__label">{label}</label> }
    <textarea
      className="textarea__text"
      defaultValue={value}
      onChange={onChange}
      placeholder="Type something..."
    />
  </div>
);

export default Textarea;
