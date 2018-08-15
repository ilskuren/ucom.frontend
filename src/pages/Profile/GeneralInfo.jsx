import React from 'react';
import classNames from 'classnames';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import PersonForm from '../../components/PersonForm';
import DropZone from '../../components/DropZone';
import Avatar from '../../components/Avatar';
import Textarea from '../../components/Textarea';
import DateInput from '../../components/DateInput';

const ProfileGeneralInfoPage = () => (
  <div className="page">
    <Header />

    <div className="content">
      <div className="content__inner_flex">
        <div className="content__vertical-menu">
          <VerticalMenu
            sections={[{ type: 'personal info', percents: '25' }, { type: 'location', percents: '0' }]}
          />
        </div>
        <div className="content__person-form">
          <PersonForm>
            <div className="profile__info-block">
              <InfoBlock title="Personal info">
                <div className="profile__text-block">
                  Userpic Preview
                </div>
                <div className={classNames('profile__block', 'profile__block_avatar')}>
                  <Avatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJAs96f68aCsNIwrrkiPAq5Ir-3dRv0QKWKBHUq5soIJBqL71E6g"
                    size="big"
                  />
                  <div className="profile__drop-zone">
                    <DropZone text="add or drag img" />
                    <div className="profile__text-block">
                      You can upload an image  in JPG or PNG format.
                      Size is not more than 10 mb.
                    </div>
                  </div>
                </div>
                <div className="profile__block">
                  <TextInput label="First name" />
                </div>
                <div className="profile__block">
                  <TextInput label="Second name" />
                </div>
                <div className="profile__block">
                  <TextInput label="Nickname" placeholder="@nickname" />
                </div>
                <div className="profile__block">
                  <TextInput label="Asset to show" placeholder="Example Kickcoin" isSearch />
                </div>
                <div className="profile__block">
                  <DateInput label="Birthday" />
                </div>
                <div className={classNames('profile__block', 'profile__block_textarea')}>
                  <Textarea label="About me" placeholder="Type something..." />
                </div>
              </InfoBlock>
            </div>
            <div className="profile__info-block">
              <InfoBlock title="Location">
                <div className="profile__block">
                  <TextInput label="Country" isSearch />
                </div>
                <div className="profile__block">
                  <TextInput label="City" isSearch />
                </div>
                <div className="profile__block">
                  <TextInput label="Address" subtext="Actual address. Example: One Apple Park Way, Cupertino" isSearch />
                </div>
              </InfoBlock>
              <div className="profile__block">
                <Button text="PROCEED" theme="red" size="big" isStretched />
              </div>
            </div>
          </PersonForm>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileGeneralInfoPage;
