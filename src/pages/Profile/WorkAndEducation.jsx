import React from 'react';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import PersonForm from '../../components/PersonForm';
import DropZone from '../../components/DropZone';
import DateInput from '../../components/DateInput';

const ProfileWorkAndEducationPage = () => (
  <div className="grid grid_profile">
    <div className="grid__item">
      <VerticalMenu
        sections={[{ type: 'blockchain', percents: '0' }, { type: 'work', percents: '0' }, { type: 'education', percents: '0' }]}
      />
    </div>
    <div className="grid__item">
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
              <span className="profile__text">Stud here now?</span>
              <Button text="add another" size="small" theme="transparent" />
            </div>
            <div className="profile__block">
              <span className="profile__text">Achievements</span>
              <DropZone text="add or drag file" />
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

export default ProfileWorkAndEducationPage;
