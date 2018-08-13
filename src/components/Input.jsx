import React from 'react';
import IconSearch from '../components/Icons/Search';
import InputError from '../components/Icons/InputError';

const Input = ({
  label, placeholder, subtext, error, isSearch,
}) => {
  const isIconExist = isSearch || error;
  const inputClassName =
    `text-input__input${error ? ' text-input__input_error' : ''}${isIconExist ? ' text-input__input_with-icon' : ''}`;
  return (
    <div className="text-input">
      <label>
        { label && <div className="text-input__label">{label}</div> }
        <div className="text-input__input-wrapper">
          <input
            className={inputClassName}
            type="text"
            placeholder={placeholder}
          />
          { isSearch && <div className="text-input__icon"><IconSearch /></div> }
          { error && <div className="text-input__icon"><InputError /></div> }
        </div>
      </label>
      { subtext && <div className="text-input__subtext">{subtext}</div> }
      { error && <div className="text-input__error">{error}</div> }
    </div>
  );
};

export default Input;
