import React from 'react';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import UserList from '../../components/UserList';

const SettingsBlacklistPage = () => (
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
    </div>
  </div>
);

export default SettingsBlacklistPage;
