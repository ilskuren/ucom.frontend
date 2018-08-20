import React from 'react';
import classNames from 'classnames';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import PersonForm from '../../components/PersonForm';

const ProfileContactsPage = () => (
  <div className="grid grid_profile">
    <div className="grid__item">
      <VerticalMenu
        sections={[{ type: 'personal contacts', percents: '0' }, { type: 'social networks', percents: '0' }]}
      />
    </div>
    <div className="grid__item">
      <PersonForm>
        <div className="profile__info-block">
          <InfoBlock title="Personal networks">
            <div className="profile__block">
              <TextInput label="Email" isRequired />
            </div>
            <div className={classNames('profile__block', 'profile__block_email')}>
              <TextInput label="Phone number" placeholder="+7 (_ _ _)_ _ _ _ _ _ _" />
            </div>
            <div className="profile__block">
              <TextInput label="Your website" />
            </div>
          </InfoBlock>
        </div>
        <div className="profile__info-block">
          <InfoBlock title="Social networks">
            <div className="profile__block">
              <TextInput label="Your facebook" />
            </div>
            <div className="profile__block">
              <TextInput label="Your Reddit" />
            </div>
            <div className="profile__block">
              <TextInput label="Your Medium" />
            </div>
            <div className="profile__block">
              <TextInput label="Your Twitter" />
            </div>
            <div className="profile__block">
              <Button text="add another" size="small" theme="transparent" />
            </div>
          </InfoBlock>
          <div className="profile__block">
            <Button text="finish" size="big" theme="red" isStretched />
          </div>
        </div>
      </PersonForm>
    </div>
  </div>
);

export default ProfileContactsPage;
