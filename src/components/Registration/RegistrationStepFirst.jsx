import React from 'react';
import Button from '../Button';
import RegistrationAccountInfo from './RegistrationAccountInfo';
import RegistrationAccountField from './RegistrationAccountField';

const RegistrationStepFirst = () => (
  <div className="registration__section registration__section_first registration__section_active">
    <div className="registration__step">1/3</div>

    <div className="registration__title">
      <h3 className="title title_small">Choose Account Name</h3>
    </div>

    <div className="registration__content">
      <RegistrationAccountInfo />
      <RegistrationAccountField />

      <div className="registration__action">
        <Button
          isStretched
          isUpper
          size="big"
          theme="red"
          type="submit"
          text="Proceed"
        />
      </div>
    </div>
  </div>
);

export default RegistrationStepFirst;
