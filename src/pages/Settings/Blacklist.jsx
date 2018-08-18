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
      { name: 'Privacy', active: true }, { name: 'Referral', active: true }, { name: 'Blacklist', active: true },
      { name: 'Wallet', active: true }]}
      isHaveBeenSavedChanges
    />

    <div className="content">
      <div className="content__black-list">
        <div className="settings">
          <div className="settings__form">
            <div className="blacklist">
              <div className="blacklist__list">
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
              <div className="blacklist__add-button">
                <Button text="add person" size="small" theme="transparent" isStretched />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsBlacklistPage;
