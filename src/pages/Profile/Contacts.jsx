import React from 'react';
import classNames from 'classnames';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';

const ProfileContactsPage = () => (
  <div className="page">
    <Header />

    <div className="content">
      <div className="content__vertical-menu">
        <VerticalMenu
          sections={[{ type: 'personal contacts', percents: '0' }, { type: 'social networks', percents: '0' }]}
        />
      </div>
      <div className="content__person-form">
        <InfoBlock title="Personal networks">
          <div className="content__block">
            <TextInput label="Email" />
          </div>
          <div className={classNames('content__block', 'content__block_email')}>
            <TextInput label="Phone number" placeholder="+7 (_ _ _)_ _ _ _ _ _ _" />
          </div>
          <div className="content__block">
            <TextInput label="Your website" />
          </div>
        </InfoBlock>
        <InfoBlock title="Social networks">
          <div className="content__block">
            <TextInput label="Your facebook" />
          </div>
          <div className="content__block">
            <TextInput label="Your Reddit" />
          </div>
          <div className="content__block">
            <TextInput label="Your Medium" />
          </div>
          <div className="content__block">
            <TextInput label="Your Twitter" />
          </div>
          <div className={classNames('content__block', 'content__block_add-button')}>
            <Button text="add another" size="small" theme="transparent" />
          </div>
          <div className="content__block">
            <Button text="FINISH" size="big" theme="red" />
          </div>
        </InfoBlock>
      </div>
    </div>
  </div>
);

export default ProfileContactsPage;
