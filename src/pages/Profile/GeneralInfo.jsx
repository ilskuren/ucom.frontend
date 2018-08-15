import React from 'react';
import Header from '../../components/Header';
import VerticalMenu from '../../components/VerticalMenu';
import PersonForm from '../../components/PersonForm';

const ProfileGeneralInfoPage = () => (
  <div className="page">
    <Header />

    <div className="content">
      <div className="content__inner content__inner_flex">
        <div className="content__vertical-menu">
          <VerticalMenu sections={[{ type: 'blockchain', percents: '0' }, { type: 'work', percents: '0' },
          { type: 'education', percents: '0' }]}
          />
        </div>
        <div className="content__person-form">
          <PersonForm>
            Content
          </PersonForm>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileGeneralInfoPage;
