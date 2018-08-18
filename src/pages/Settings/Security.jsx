import React from 'react';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Switcher from '../../components/Switcher';

const SettingsSecurityPage = () => (
  <div className="page">
    <Header />
    <NavBar
      title="Security"
      tabs={[{ name: 'Account', active: true }, { name: 'Notifications', active: true }, { name: 'Security', active: true },
      { name: 'Privacy', active: true }, { name: 'Referral', active: true }, { name: 'Blacklist', active: true },
      { name: 'Wallet', active: true }]}
      isHaveBeenSavedChanges
    />

    <div className="content">
      <div className="content__inner_flex">
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
      </div>
    </div>
  </div>
);

export default SettingsSecurityPage;
