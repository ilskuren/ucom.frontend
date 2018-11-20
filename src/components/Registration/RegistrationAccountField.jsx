import React from 'react';
import InputErrorIcon from '../Icons/InputError';
import InputCompleteIcon from '../Icons/InputComplete';

const RegistrationAccountField = () => (
  <div className="registration-account-field">
    <div className="registration-account-field__label">Account name</div>
    <div className="registration-account-field__input">
      <span className="registration-account-field__sign">@</span>
      <input type="text" className="registration-account-field__data" placeholder="helloworld12" minLength="12" maxLength="12" />
      <span className="registration-account-field__progress registration-account-field__progress_success" />
    </div>

    <div className="registration-account-field__hint">
      <span className="inline inline_small">
        <span className="inline__item">
          <InputErrorIcon />
        </span>
        <span className="inline__item">
          Account name is already taken
        </span>
      </span>
    </div>

    <div className="registration-account-field__hint">
      <span className="inline inline_small">
        <span className="inline__item">
          <InputCompleteIcon />
        </span>
        <span className="inline__item">
          Nice name! Memorize it
        </span>
      </span>
    </div>
  </div>
);

export default RegistrationAccountField;
