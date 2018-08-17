import React from 'react';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import UserList from '../../components/UserList';

const SettingsSecurityPage = () => (
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
        <UserList />
      </div>
    </div>
  </div>
);

export default SettingsSecurityPage;
