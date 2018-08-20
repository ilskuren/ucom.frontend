import React from 'react';
import classNames from 'classnames';
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
  <div className="grid grid_profile">
    <div className="grid__item">
      <VerticalMenu
        sections={[{ type: 'personal info', percents: '25' }, { type: 'location', percents: '0' }]}
      />
    </div>
    <div className="grid__item">
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
                alt="Avatar"
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
              <TextInput label="First name" value="Sub" />
            </div>
            <div className="profile__block">
              <TextInput label="Second name" value="Zero" />
            </div>
            <div className="profile__block">
              <TextInput label="Nickname" placeholder="@nickname" isRequired />
            </div>
            <div className="profile__block">
              <TextInput label="Asset to show" placeholder="Example Kickcoin" isSearch isRequired />
            </div>
            <div className="profile__block">
              <DateInput label="Birthday" />
            </div>
            <div className={classNames('profile__block', 'profile__block_textarea')}>
              <Textarea rows={6} label="About me" placeholder="Type something..." />
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
            <Button text="proceed" theme="red" size="big" isStretched />
          </div>
        </div>
      </PersonForm>
    </div>
  </div>
);

export default ProfileGeneralInfoPage;
