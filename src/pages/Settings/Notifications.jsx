import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfoBlock from '../../components/InfoBlock';
import Switcher from '../../components/Switcher';
import Checkbox from '../../components/Checkbox';

import * as actions from '../../actions/settings';

const mapDispatch = dispatch =>
  bindActionCreators({
    setSettingsNotificationsData: actions.setSettingsNotificationsData,
    resetSettingsNotifications: actions.resetSettingsNotifications,
    validateSettingsNotifications: actions.validateSettingsNotifications,
    validateSettingsNotificationsField: actions.validateSettingsNotificationsField,
  }, dispatch);


const mapStateToProps = state => ({
  user: state.user,
  notifications: state.settings.notifications,
});

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

class SettingsNotificationsPage extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <div className="settings">
        <div className="settings__container">
          <div className={classNames('settings__info-block', 'settings__info-block_alerts')}>
            <InfoBlock title="Alerts" size="small">
              {
                alerts.map((item, index) => (
                  <div className="settings__block" key={index}>
                    <div className="settings__label">
                      {item.name}
                    </div>
                    <div className="settings__switcher">
                      <Switcher
                        isChecked={item.value}
                        onChange={(checkValue) => {
                          this.props.setSettingsNotificationsData({ [`${item.name}`]: checkValue });
                          this.props.validateSettingsNotificationsField('alerts.----'); // TODO: ?? alerts.
                        }}
                      />
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
                      <Checkbox
                        isChecked={item.value}
                        onChange={(checkValue) => {
                          this.props.setSettingsNotificationsData({ [`${item.name}`]: checkValue });
                          this.props.validateSettingsNotificationsField('account.----'); // TODO: ?? account.
                        }}
                      />
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
                      <Checkbox
                        isChecked={item.value}
                        onChange={(checkValue) => {
                          this.props.setSettingsNotificationsData({ [`${item.name}`]: checkValue });
                          this.props.validateSettingsNotificationsField('platform_events.----'); // TODO: ?? platform_events.
                        }}
                      />
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
  }
}

SettingsNotificationsPage.propTypes = {
  setSettingsNotificationsData: PropTypes.func,
  validateSettingsNotificationsField: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatch)(SettingsNotificationsPage);
