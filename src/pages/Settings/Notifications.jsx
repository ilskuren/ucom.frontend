import React from 'react';
import classNames from 'classnames';
import InfoBlock from '../../components/InfoBlock';
import Switcher from '../../components/Switcher';
import Checkbox from '../../components/Checkbox';

const alerts = [
  { name: 'Platform notifications', value: true },
  { name: 'Web push', value: false },
  { name: 'E-mail Notifications', value: false },
  { name: 'E-mail Newsletter', value: false },
];

const account = [
  { name: 'Upvote / downvote', value: true },
  { name: 'Share', value: false },
  { name: 'Comment', value: false },
  { name: 'Feed Posts', value: false },
  { name: 'Mentions / replies', value: false },
  { name: 'Private messages', value: false },
  { name: 'Participated in polls', value: false },
];

const events = [
  { name: 'Follow', value: true },
  { name: 'Trust', value: false },
  { name: 'Join (Custom CTA)', value: false },
  { name: 'Board invitations', value: false },
  { name: 'Upcoming events', value: false },
];

const SettingsNotificationsPage = () => (
  <div className="settings">
    <div className="settings__container">
      <div className={classNames('settings__info-block', 'settings__info-block_alerts')}>
        <InfoBlock title="Alerts" size="small">
          {
            alerts.map((item, index) => (
              <div className={classNames('settings__block', 'settings__block_alerts')} key={index}>
                <div className={classNames('settings__label', 'settings__label_alerts')}>
                  {item.name}
                </div>
                <div className="settings__switcher">
                  <Switcher isChecked={item.value} />
                </div>
              </div>
            ))
          }
        </InfoBlock>
      </div>
      <div className={classNames('settings__info-block', 'settings__info-block_account')}>
        <InfoBlock title="Account" size="small">
          {
            account.map((item, index) => (
              <div className="settings__checkbox inline" key={index}>
                <div className="inline__item">
                  <Checkbox isChecked={item.value} />
                </div>
                <div className="inline__item">
                  {item.name}
                </div>
              </div>
            ))
          }
        </InfoBlock>
      </div>
      <div className={classNames('settings__info-block', 'settings__info-block_events')}>
        <InfoBlock title="Platform events" size="small">
          {
            events.map((item, index) => (
              <div className="settings__checkbox inline" key={index}>
                <div className="inline__item">
                  <Checkbox isChecked={item.value} />
                </div>
                <div className="inline__item">
                  {item.name}
                </div>
              </div>
            ))
          }
        </InfoBlock>
      </div>
    </div>
  </div>
);

export default SettingsNotificationsPage;
