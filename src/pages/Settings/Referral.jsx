import React from 'react';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

const SettingsReferralPage = () => (
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
        <div className="content__settings-form">
          Settings
        </div>
      </div>
    </div>
  </div>
);

export default SettingsReferralPage;
