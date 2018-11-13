import React from 'react';
import TextInput from '../TextInput';
import Button from '../Button';

const RegistrationStepSecond = () => (
  <div className="registration__section registration__section_second">
    <div className="registration__step">1/4</div>
    <h3 className="registration__title registration__title_medium">Account Name and Password</h3>

    <div className="registration__field">
      <div className="registration__field-label">
        <h4 className="registration__title registration__title_small">Account Name</h4>
        <p>The lengh of user name should be exactly 12 symbols, latin letters and numbers from 1 to 5.</p>
      </div>
      <div className="registration__field-input">
        <TextInput />
      </div>
    </div>

    <div className="registration__field">
      <div className="registration__field-label">
        <h4 className="registration__title registration__title_small">Password</h4>
        <p>The password will be used to encrypt your keys. You won’t be able to restore your password, so don’t forget it!</p>
      </div>
      <div className="registration__field-input">
        <TextInput type="password" />
      </div>
    </div>

    <div className="registration__field">
      <div className="registration__field-label">
        <h4 className="registration__title registration__title_small">Confirm password</h4>
      </div>
      <div className="registration__field-input">
        <TextInput type="password" />
      </div>
    </div>

    <div className="registration__action">
      <Button
        isUpper
        size="big"
        theme="red"
        type="submit"
        text="Proceed"
      />
    </div>
  </div>
);

export default RegistrationStepSecond;
