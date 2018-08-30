import React from 'react';
import InputWithCopy from '../../components/InputWithCopy';
import Accordeon from '../../components/Accordeon';

const SettingsReferralPage = () => (
  <div className="settings">
    <div className="form">
      <div className="form__block">
        <div className="form__label">Your referral link</div>
        <div className="form__input"><InputWithCopy value="Email" /></div>
      </div>
      <div className="form__title">Social network</div>
      <div className="form__block">
        <div className="form__combine-label-input">
          <Accordeon label="Facebook" />
        </div>
      </div>
      <div className="form__block">
        <div className="form__combine-label-input">
          <Accordeon label="Twitter" />
        </div>
      </div>
      <div className="form__block">
        <div className="form__combine-label-input">
          <Accordeon label="Github" isOpened />
        </div>
      </div>
    </div>
  </div>
);

export default SettingsReferralPage;
