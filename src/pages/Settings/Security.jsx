import React from 'react';
import Switcher from '../../components/Switcher';

const SettingsSecurityPage = () => (
  <div className="settings">
    <div className="settings__form">
      <div className="settings__block">
        <div className="settings__label">Auto-login</div>
        <div className="settings__input">
          <Switcher />
        </div>
      </div>
      <div className="settings__block">
        <div className="settings__label">2FA</div>
        <div className="settings__input">
          <Switcher />
        </div>
      </div>
    </div>
  </div>
);

export default SettingsSecurityPage;
