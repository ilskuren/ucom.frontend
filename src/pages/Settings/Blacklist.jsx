import React from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button';
import NavBar from '../../components/NavBar';
import UserList from '../../components/UserList';

const SettingsBlacklistPage = () => (
  <div className="page">
    <Header />
    <NavBar
      title="Blacklist"
      tabs={[{ name: 'Account', active: true }, { name: 'Notifications', active: true }, { name: 'Security', active: true },
      { name: 'Privacy', active: true }, { name: 'Referal', active: true }, { name: 'Blacklist', active: true },
      { name: 'Wallet', active: true }]}
      isHaveBeenSavedChanges
    />

    <div className="content">
      <div className="settings">
        <div className="settings__block">
          <UserList list={[
            {
              src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
              name: 'Bruce Wayne',
              nickname: '@bruce_wayne',
            },
            {
              src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
              name: 'Bruce Wayne',
              nickname: '@bruce_wayne',
            },
            {
              src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
              name: 'Bruce Wayne',
              nickname: '@bruce_wayne',
            },
            {
              src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
              name: 'Bruce Wayne',
              nickname: '@bruce_wayne',
            }]}
          />
        </div>
        <div className="settings__block">
          <Button text="add person" size="small" theme="transparent" />
        </div>
      </div>
    </div>
  </div>
);

export default SettingsBlacklistPage;
