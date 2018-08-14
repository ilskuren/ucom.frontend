import React from 'react';

const Textarea = ({
  label, value, onChange,
}) => (
  <div className="textarea">
    <div className="textarea__label">{label}</div>
    <textarea className="textarea__text" defaultValue={value} onChange={onChange} />
  </div>
);

export default Textarea;
