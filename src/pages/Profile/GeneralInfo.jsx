import React from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import PersonForm from '../../components/PersonForm';
import DropZone from '../../components/DropZone';
import NavBar from '../../components/NavBar';
import DateInput from '../../components/DateInput';

const ProfileGeneralInfoPage = () => (
  <div className="page">
    <Header />
    <NavBar
      title="Create Profile"
      tabs={[{ name: 'General Info', active: true },
      { name: 'Work & Education', active: true }, { name: 'Contacts', active: true }]}
      isHaveBeenSavedChanges
    />
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
              <InfoBlock title="Blockchain">
                <div className="profile__block">
                  <TextInput label="Your first asset" placeholder="Example Kickcoin" isSearch />
                </div>
                <div className="profile__block">
                  <TextInput label="Year of purchase" inputWidth={100} />
                </div>
              </InfoBlock>
            </div>
            <div className="profile__info-block">
              <InfoBlock title="Work">
                <div className="profile__block">
                  <TextInput label="Work place" />
                </div>
                <div className="profile__block">
                  <TextInput label="Position" />
                </div>
                <div className="profile__block">
                  <DateInput label="Started date" />
                </div>
                <div className="profile__block">
                  <DateInput label="Ended date" />
                </div>
                <div className="profile__block">
                  <span className="profile__text">Work here now?</span>
                  <Button text="add another" size="small" theme="transparent" />
                </div>
              </InfoBlock>
            </div>
            <div className="profile__info-block">
              <InfoBlock title="Education">
                <div className="profile__block">
                  <TextInput label="Education" />
                </div>
                <div className="profile__block">
                  <TextInput label="Spec" />
                </div>
                <div className="profile__block">
                  <TextInput label="Level" />
                </div>
                <div className="profile__block">
                  <DateInput label="Started date" />
                </div>
                <div className="profile__block">
                  <DateInput label="Ended date" />
                </div>
                <div className="profile__block">
                  <span className="profile__text">Work here now?</span>
                  <Button text="Stud here now?" size="small" theme="transparent" />
                </div>
                <div className="profile__block">
                  <DropZone text="add or drag file" />
                </div>
                <div className="profile__block">
                  <Button text="PROCEED" theme="red" size="big" isStretched />
                </div>
              </InfoBlock>
            </div>
          </PersonForm>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileGeneralInfoPage;
