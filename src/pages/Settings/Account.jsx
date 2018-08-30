import React from 'react';
import TextInput from '../../components/TextInput';
import Dropdown from '../../components/Dropdown';
import PrefixInput from '../../components/PrefixInput';
import Link from '../../components/Link';
import KYC from '../../components/KYC';

const SettingsAccountPage = () => (
  <div className="settings">
    <div className="form">
      <div className="form__block">
        <div className="form__label">Email</div>
        <div className="form__input"><TextInput /></div>
      </div>
      <div className="form__block">
        <div className="form__label">Password</div>
        <div className="form__input">
          <TextInput type="password" />
          <div className="form__change-password-button">
            <Link href="#">Change password</Link>
          </div>
        </div>
      </div>

      <div className="form__block">
        <div className="form__label">Profile link</div>
        <div className="form__input">
          <PrefixInput
            prefix="u.community/"
            subtext="You can change your profile URL once"
          />
        </div>
      </div>
      <div className="form__block">
        <div className="form__label">KYC</div>
        <div className="form__input"><KYC /></div>
      </div>
      <div className="form__block">
        <div className="form__label">Timezone</div>
        <div className="form__input"><Dropdown options={[]} /></div>
      </div>
      <div className="form__block">
        <div className="form__label">Language</div>
        <div className="form__input"><Dropdown options={[]} /></div>
      </div>
      <div className="form__block">
        <div className="form__label">Currency</div>
        <div className="form__input"><Dropdown options={[]} /></div>
      </div>
    </div>
  </div>
);

export default SettingsAccountPage;
