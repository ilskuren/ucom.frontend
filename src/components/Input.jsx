import React from 'react';

const Input = ({ label, placeholder }) => (
  <div className="text-input">
    <label>
      { label && <div className="text-input__label">{label}</div> }
      <input
        className="text-input__input"
        type="text"
        placeholder={placeholder}
      />
    </label>
  </div>
);

export default Input;
