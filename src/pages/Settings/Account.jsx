import React from 'react';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import TextInput from '../../components/TextInput';

const SettingsAccountPage = () => (
  <div className="page">
    <Header />
    <NavBar
      title="Settings"
      tabs={[{ name: 'Account', active: true }, { name: 'Notifications', active: true }, { name: 'Security', active: true },
      { name: 'Referral', active: true }, { name: 'Blacklist', active: true }]}
      isHaveBeenSavedChanges
    />

    <div className="content">
      <div className="content__inner_flex">
        <div className="settings__block">
          <div className="settings__label">Email</div>
          <div className="settings__input"><TextInput /></div>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsAccountPage;
