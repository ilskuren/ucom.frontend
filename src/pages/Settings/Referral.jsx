import React from 'react';
import InputWithCopy from '../../components/InputWithCopy';
import Accordeon from '../../components/Accordeon';

const SettingsReferralPage = () => (
  <div className="settings">
    <div className="settings__form">
      <div className="settings__block">
        <div className="settings__label">Your referral link</div>
        <div className="settings__input"><InputWithCopy value="Email" /></div>
      </div>
      <div className="settings__title">Social network</div>
      <div className="settings__block">
        <div className="settings__combine-label-input">
          <Accordeon label="Facebook" />
        </div>
      </div>
      <div className="settings__block">
        <div className="settings__combine-label-input">
          <Accordeon label="Twitter" />
        </div>
      </div>
      <div className="settings__block">
        <div className="settings__combine-label-input">
          <Accordeon label="Github" isOpened />
        </div>
      </div>
    </div>
  </div>
);

export default SettingsReferralPage;
