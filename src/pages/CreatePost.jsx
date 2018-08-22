import { Route } from 'react-router';
import React, { Fragment } from 'react';
import StoryPage from './Posts/Story';
import Button from '../components/Button';
import SmallProfileDropdown from '../components/SmallProfileDropdown';
import PrefixInput from '../components/PrefixInput';
import SecondaryTabBar from '../components/SecondaryTabBar';
import HordeIco from '../static/img/horde_ico.png';

const TABS = [
  'Story',
  'Challenge',
  'Poll',
  'News',
  'Trading Forecast',
  'Review',
  'Analitics',
  'Interview',
];

const CreatePost = () => (
  <div className="create-post">
    <div className="create-post__header">
      <div className="create-post__label">
        <h1>Create Media Post</h1>
      </div>
      <div className="create-post__post-button">
        <Button isStretched size="small" theme="red" text="Post" />
      </div>
      <div className="create-post__author">
        <label className="create-post__author-label">By</label>
        <div className="create-post__profile-dropdown">
          <SmallProfileDropdown
            isActive
            avatar={HordeIco}
            name="Kirill Romanov"
            companyAvatar={HordeIco}
            companyName="HORDE"
            companyTitle="Horde ICO"
          />
        </div>
      </div>
      <div className="create-post__form-block">
        <div className="create-post__form-label">Name Media Post</div>
        <div className="create-post__form-input">
          <PrefixInput prefix="u.community/" subtext="Media Post id — id23784528" />
        </div>
      </div>
      <div className="create-post__navigation">
        <SecondaryTabBar tabs={TABS} activeTab="Story" />
      </div>
    </div>
    <Fragment>
      <Route exact path="/posts/new/story" component={StoryPage} />
    </Fragment>
  </div>
);

export default CreatePost;
