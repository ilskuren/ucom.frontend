import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconClose from 'components/Icons/Close';
import NotificationCard from 'components/NotificationCard';
import { hideNotificationTooltip } from '../actions/siteNotifications';

const NotificationTooltip = props => (
  <div className="notification-tooltip__container">
    <div className="notification-tooltip__header notification-tooltip__header_new">
      <h3 className="notification-tooltip__title">New notifications</h3>
    </div>
    <div className="notification-tooltip__list notification-tooltip__list_new">
      {Object.values(props.tooltipNotificationsList).filter(i => i.recent).map(item => (
        <div className="notification-tooltip__item notification-tooltip__item_new">
          <NotificationCard
            avatar={item.avatar}
            username={item.username}
            description={item.description}
            time={item.time}
            postCover={item.postCover}
            reply={item.reply}
            isReplay={item.isReplay}
            relatingPost={item.relatingPost}
          />
        </div>
      ))}
    </div>
    <div className="notification-tooltip__header">
      <h3 className="notification-tooltip__title">Early</h3>
    </div>
    <div className="notification-tooltip__list">
      {Object.values(props.tooltipNotificationsList).filter(i => !i.recent).map(item => (
        <div className="notification-tooltip__item">
          <NotificationCard
            avatar={item.avatar}
            username={item.username}
            description={item.description}
            time={item.time}
            postCover={item.postCover}
            reply={item.reply}
            isReplay={item.isReplay}
            relatingPost={item.relatingPost}
          />
        </div>
        ))}
    </div>
    <div
      className="inline__item notification-tooltip__close"
      onClick={() => props.hideTooltip()}
      role="presentation"
    >
      <IconClose />
    </div>
  </div>
);
NotificationTooltip.propTypes = {
  hideTooltip: PropTypes.func,
  tooltipNotificationsList: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  state => ({
    tooltipVisibilty: state.siteNotifications.tooltipVisibilty,
    tooltipNotificationsList: state.siteNotifications.tooltipNotificationsList,
  }),
  dispatch => ({

    hideTooltip: () => dispatch(hideNotificationTooltip()),
  }),
)(NotificationTooltip);
