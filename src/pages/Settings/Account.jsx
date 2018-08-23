import React from 'react';
import TextInput from '../../components/TextInput';
import Dropdown from '../../components/Dropdown';
import PrefixInput from '../../components/PrefixInput';
import Link from '../../components/Link';
import KYC from '../../components/KYC';

const SettingsAccountPage = () => (
  <div className="settings">
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
);

export default SettingsAccountPage;
