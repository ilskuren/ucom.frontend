import React from 'react';
import Switcher from '../../components/Switcher';

const SettingsSecurityPage = () => (
  <div className="settings">
    <div className="form">
      <div className="form__block">
        <div className="form__label">Auto-login</div>
        <div className="form__input">
          <Switcher />
        </div>
      </div>
      <div className="form__block">
        <div className="form__label">2FA</div>
        <div className="form__input">
          <Switcher />
        </div>
      </div>
    </div>
  </div>
);

export default SettingsSecurityPage;
