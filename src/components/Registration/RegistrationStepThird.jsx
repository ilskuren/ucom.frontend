import React from 'react';
import Button from '../Button';
import RegistrationBrainkeyVerification from './RegistrationBrainkeyVerification';
import Checkbox from '../Checkbox';

const RegistrationStepThird = () => (
  <div className="registration__section registration__section_third">
    <div className="registration__step">3/3</div>

    <div className="registration__title">
      <h3 className="title title_small">Verification</h3>
    </div>

    <div className="registration__content">
      <div className="registration__text">
        <div className="text">
          <p>
            Type in the words number 2 and 4 from your Brainkey.<br />
            If you didn&apos;t save your Brainkey, <a className="registration__link" href="#">generate a new one</a>.
          </p>
        </div>
      </div>

      <RegistrationBrainkeyVerification />

      <div className="registration-terms">
        <div className="registration-terms__item">
          <span className="inline">
            <span className="inline__item"><Checkbox /></span>
            <span className="inline__item">I accept the  General <a className="registration__link" href="#">Terms and Conditions.</a></span>
          </span>
        </div>
        <div className="registration-terms__item">
          <span className="inline">
            <span className="inline__item"><Checkbox /></span>
            <span className="inline__item">Allow to send anonymous usage data for developer.</span>
          </span>
        </div>
      </div>

      <div className="registration-footer">
        <div className="registration-footer__action">
          <Button
            isStretched
            isUpper
            size="big"
            theme="red"
            type="submit"
            text="Finish"
          />
        </div>
        <div className="registration-footer__error">
          Selected keywords don&apos;t match with entered on previous step.<br />Try check the order of your phrase.
        </div>
      </div>
    </div>
  </div>
);

export default RegistrationStepThird;
