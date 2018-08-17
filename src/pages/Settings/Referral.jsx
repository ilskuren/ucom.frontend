import React from 'react';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import InputWithCopy from '../../components/InputWithCopy';
import Dropdown from '../../components/Dropdown';

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
        <div className="settings">
          <div className="settings__form">
            <div className="settings__block">
              <div className="settings__label">Your referral link</div>
              <div className="settings__input"><InputWithCopy value="Email" /></div>
            </div>
            <div className="settings__block">
              <div className="settings__label">Facebook</div>
              <div className="settings__input">
                <Dropdown
                  options={[
                    { name: 'Bruce Wayne' },
                    { name: 'Bruce Wayne' },
                    { name: 'Bruce Wayne' },
                    { name: 'Bruce Wayne' },
                    { name: 'Bruce Wayne' },
                  ]}
                />
              </div>
            </div>
            <div className="settings__block">
              <div className="settings__label">Twitter</div>
              <div className="settings__input">
                <Dropdown
                  options={[
                    { name: 'Bruce Wayne' },
                    { name: 'Bruce Wayne' },
                    { name: 'Bruce Wayne' },
                    { name: 'Bruce Wayne' },
                    { name: 'Bruce Wayne' },
                  ]}
                />
              </div>
            </div>
            <div className="settings__block">
              <div className="settings__label">GitHub</div>
              <div className="settings__input">
                <Dropdown
                  isOpened
                  options={[
                    { name: 'Bruce Wayne' },
                    { name: 'Bruce Wayne' },
                    { name: 'Bruce Wayne' },
                    { name: 'Bruce Wayne' },
                    { name: 'Bruce Wayne' },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsReferralPage;
