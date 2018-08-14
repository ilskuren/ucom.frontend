import React from 'react';
import classNames from 'classnames';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import InfoBlock from '../../components/InfoBlock';

const ProfileContactsPage = () => (
  <div className="page">
    <Header />

    <div className="content">
      Contacts
    </div>
    <InfoBlock title="Personal networks">
      <div className="profile__block">
        <TextInput label="Email" />
      </div>
      <div className={classNames('profile__block', 'profile__block_email')}>
        <TextInput label="Phone number" />
      </div>
      <div className="profile__block">
        <TextInput label="Your website" />
      </div>
    </InfoBlock>
    <InfoBlock title="Social networks">
      <div className="profile__block">
        <TextInput label="Your facebook" />
      </div>
      <div className="profile__block">
        <InfoBlock label="Your Reddit" />
      </div>
      <div className="profile__block">
        <TextInput label="Your Medium" />
      </div>
      <div className="profile__block">
        <TextInput label="Your Twitter" />
      </div>
      <div className={classNames('profile__block', 'profile__block_add-button')}>
        <Button text="add another" size="small" theme="grey" />
      </div>
      <div className="profile__block">
        <Button text="FINISH" size="big" theme="red" />
      </div>
    </InfoBlock>
  </div>
);

export default ProfileContactsPage;
