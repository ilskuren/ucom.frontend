import React from 'react';
import Header from '../../components/Header';
import Textarea from '../../components/Textarea';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import InfoBlock from '../../components/InfoBlock';

const ProfileContactsPage = () => (
  <div className="page">
    <Header />

    <div className="content">
      Contacts
    </div>
    <InfoBlock title="personal networks">

    </InfoBlock>
    <div style={{ width: '600px', height: '300px', margin: '30px' }}>
      <Textarea label="fsdfsd" />
    </div>
    <div style={{ width: '600px', height: '300px', margin: '30px' }}>
      <Dropdown options={['fsdfsd', 'dsfsdf ', 'dsfsdf']} value="fkjdsgh kjdshgkljfsdhglkjsfgh " />
    </div>
  </div>
);

export default ProfileContactsPage;
