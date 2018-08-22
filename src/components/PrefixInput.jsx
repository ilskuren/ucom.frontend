import React from 'react';
import PropTypes from 'prop-types';

const PrefixInput = ({
  value, error, label, placeholder, subtext, inputWidth, isRequired, type, prefix,
}) => (
  <div className="prefix-input">
    <label>
      {
        (isRequired || label) && (
          <div className="prefix-input__labels-container">
            { label && <div className="prefix-input__label">{label}</div> }
            { isRequired && <div className="prefix-input__required-label">It needs to be filled <span role="img" aria-label="hugging face">🤗</span></div> }
          </div>
        )
      }
      <div className="prefix-input__input-wrapper" style={{ width: inputWidth }}>
        <span className="prefix-input__prefix">{prefix}</span>
        <input
          value={value}
          className="prefix-input__input"
          type={type}
          placeholder={placeholder}
        />
      </div>
    </label>
    { subtext && <div className="prefix-input__subtext">{subtext}</div> }
    { error && <div className="prefix-input__error">{error}</div> }
  </div>
);

PrefixInput.propTypes = {
  value: PropTypes.string,
  prefix: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  subtext: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  inputWidth: PropTypes.number,
};


export default PrefixInput;
