import React from 'react';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import TextInput from '../../components/TextInput';
import Dropdown from '../../components/Dropdown';
import PrefixInput from '../../components/PrefixInput';
import Link from '../../components/Link';
import KYC from '../../components/KYC';

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
        <div className="settings__form">
          <div className="settings__block">
            <div className="settings__label">Email</div>
            <div className="settings__input"><TextInput /></div>
          </div>
          <div className="settings__block">
            <div className="settings__label">Password</div>
            <div className="settings__input">
              <TextInput type="password" />
              <div className="settings__change-password-button">
                <Link href="#">Change password</Link>
              </div>
            </div>
          </div>

          <div className="settings__block">
            <div className="settings__label">Profile link</div>
            <div className="settings__input">
              <PrefixInput
                prefix="u.community/"
                subtext="You can change your profile URL once"
              />
            </div>
          </div>
          <div className="settings__block">
            <div className="settings__label">KYC</div>
            <div className="settings__input"><KYC /></div>
          </div>
          <div className="settings__block">
            <div className="settings__label">Timezone</div>
            <div className="settings__input"><Dropdown options={[]} /></div>
          </div>
          <div className="settings__block">
            <div className="settings__label">Language</div>
            <div className="settings__input"><Dropdown options={[]} /></div>
          </div>
          <div className="settings__block">
            <div className="settings__label">Currency</div>
            <div className="settings__input"><Dropdown options={[]} /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsAccountPage;
