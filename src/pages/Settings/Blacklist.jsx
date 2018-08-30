import React from 'react';
import Button from '../../components/Button';
import UserList from '../../components/UserList';

const SettingsBlacklistPage = () => (
  <div className="settings">
    <div className="form">
      <div className="blacklist">
        <div className="blacklist__list">
          <UserList list={[
            {
              src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
              name: 'Bruce Wayne',
              nickname: '@bruce_wayne',
            },
            {
              src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
              name: 'Bruce Wayne',
              nickname: '@bruce_wayne',
            },
            {
              src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
              name: 'Bruce Wayne',
              nickname: '@bruce_wayne',
            },
            {
              src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
              name: 'Bruce Wayne',
              nickname: '@bruce_wayne',
            }]}
          />
        </div>
        <div className="blacklist__add-button">
          <Button text="add person" size="small" theme="transparent" isStretched />
        </div>
      </div>
    </div>
  </div>
);

export default SettingsBlacklistPage;
