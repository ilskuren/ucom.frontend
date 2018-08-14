import React from 'react';
import IconSearch from '../components/Icons/Search';
import InputError from '../components/Icons/InputError';
import InputComplete from '../components/Icons/InputComplete';

const Input = ({
  value, label, placeholder, subtext, error, isSearch,
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
            value={value}
            className={inputClassName}
            type="text"
            placeholder={placeholder}
          />
          { isSearch && <div className="text-input__icon"><IconSearch /></div> }
          { error && <div className="text-input__icon"><InputError /></div> }
          { value && <div className="text-input__icon"><InputComplete /></div> }
        </div>
      </label>
      { subtext && <div className="text-input__subtext">{subtext}</div> }
      { error && <div className="text-input__error">{error}</div> }
    </div>
  );
};

export default Input;
