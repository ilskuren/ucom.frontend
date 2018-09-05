import React, { PureComponent } from 'react';
import { bind } from 'decko';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfoBlock from '../../components/InfoBlock';
import Switcher from '../../components/Switcher';
import Checkbox from '../../components/Checkbox';

import * as actions from '../../actions/settings';
import * as selectors from '../../utils/selectors/settings';

const mapDispatch = dispatch =>
  bindActionCreators({
    setSettingsNotificationsData: actions.setSettingsNotificationsData,
    resetSettingsNotifications: actions.resetSettingsNotifications,
  }, dispatch);


const mapStateToProps = state => ({
  notifications: selectors.selectSettingsNotifications(state),
});

const alertTitles = {
  platformNotifications: { name: 'Platform notifications' },
  webPush: { name: 'Web push' },
  emailNotifications: { name: 'E-mail Notifications' },
  emailNewsletter: { name: 'E-mail Newsletter' },
};

const accountTitles = {
  vote: { name: 'Upvote / downvote' },
  share: { name: 'Share' },
  comment: { name: 'Comment' },
  feedPosts: { name: 'Feed Posts' },
  mentions: { name: 'Mentions / replies' },
  privateMessages: { name: 'Private messages' },
  participatedInPolls: { name: 'Participated in polls' },
};

const eventTitles = {
  follow: { name: 'Follow' },
  trust: { name: 'Trust' },
  join: { name: 'Join (Custom CTA)' },
  boardInvitations: { name: 'Board invitations' },
  upcomingEvents: { name: 'Upcoming events' },
};

class SettingsNotificationsPage extends PureComponent {
  componentDidMount() {

  }

  @bind
  makeHandleCheckBoxToggle({ item, type }) {
    return checkValue => this.props.setSettingsNotificationsData({ type, item, checkValue });
  }

  render() {
    const { alerts, account, events } = this.props.notifications.data;

    return (
      <div className="settings">
        <div className="settings__container">
          <div className={classNames('settings__info-block', 'settings__info-block_alerts')}>
            <InfoBlock title="Alerts" size="small">
              {
                Object.keys(alertTitles).map((item, index) => (
                  <div className="settings__block" key={index}>
                    <div className="settings__label">
                      {alertTitles[item].name}
                    </div>
                    <div className="settings__switcher">
                      <Switcher
                        isChecked={alerts[item]}
                        onChange={this.makeHandleCheckBoxToggle({ type: 'alerts', item })}
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
                Object.keys(accountTitles).map((item, index) => (
                  <div className="settings__checkbox inline" key={index}>
                    <div className="inline__item">
                      <Checkbox
                        isChecked={account[item]}
                        onChange={checkValue => this.handleCheckBoxToggle({ type: 'account', item, checkValue })}
                      />
                    </div>
                    <div className="inline__item">
                      {accountTitles[item].name}
                    </div>
                  </div>
                ))
              }
            </InfoBlock>
          </div>
          <div className={classNames('settings__info-block', 'settings__info-block_events')}>
            <InfoBlock title="Platform events" size="small">
              {
                Object.keys(eventTitles).map((item, index) => (
                  <div className="settings__checkbox inline" key={index}>
                    <div className="inline__item">
                      <Checkbox
                        isChecked={events[item]}
                        onChange={checkValue => this.handleCheckBoxToggle({ type: 'events', item, checkValue })}
                      />
                    </div>
                    <div className="inline__item">
                      {eventTitles[item].name}
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
  notifications: PropTypes.shape({
    data: PropTypes.shape({
      alerts: PropTypes.object,
      account: PropTypes.object,
      events: PropTypes.object,
    }),
  }),
};

export default connect(mapStateToProps, mapDispatch)(SettingsNotificationsPage);
