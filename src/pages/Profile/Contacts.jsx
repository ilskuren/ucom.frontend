import React from 'react';
import classNames from 'classnames';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import PersonForm from '../../components/PersonForm';
import NavBar from '../../components/NavBar';
import Tooltip from '../../components/Tooltip';
import ProfileTooltipContent from '../../components/ProfileTooltipContent';
import PostTooltipContent from '../../components/PostTooltipContent';
import HordeIcon from '../../static/img/horde_ico.png';

const ProfileContactsPage = () => (
  <div className="page">
    <Header />
    <NavBar
      title="Create Profile"
      tabs={[{ name: 'General Info', active: true },
      { name: 'Work & Education', active: true }, { name: 'Contacts', active: true }]}
      isHaveBeenSavedChanges
      isDisplayedBackButton
    />

    <div className="content">
      <div className="content__inner_flex">
        <div className="content__vertical-menu">
          <VerticalMenu
            sections={[{ type: 'personal contacts', percents: '0' }, { type: 'social networks', percents: '0' }]}
          />
        </div>
        <div className="content__person-form">
          <PersonForm>
            <div className="profile__info-block">
              <InfoBlock title="Personal networks">
                <div className="profile__block">
                  <div>111</div>
                  <Tooltip>
                    <ProfileTooltipContent title="Horde ICO" username="HORDE" avatar={HordeIcon} />
                  </Tooltip>
                </div>
                <div className="profile__block">
                  <div>111</div>
                  <Tooltip>
                    <PostTooltipContent />
                  </Tooltip>
                </div>
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
    </div>
  </div>
);

export default ProfileContactsPage;
