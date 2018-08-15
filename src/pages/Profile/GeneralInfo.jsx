import React from 'react';
import Header from '../../components/Header';
import VerticalMenu from '../../components/VerticalMenu';
import PersonForm from '../../components/PersonForm';
import NavBar from '../../components/NavBar';
import TextInput from '../../components/TextInput';


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
      <div className="content__inner content__inner_flex">
        <div className="content__vertical-menu">
          <VerticalMenu sections={[{ type: 'blockchain', percents: '0' }, { type: 'work', percents: '0' },
          { type: 'education', percents: '0' }]}
          />
        </div>
        <div className="content__person-form">
          <PersonForm>
            <TextInput label="label" isRequired />
          </PersonForm>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileGeneralInfoPage;
