import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { uniqueId } from 'lodash';
import IconClose from 'components/Icons/Close';
import NotificationCard from 'components/NotificationCard';
import {
  hideNotificationTooltip,
  addSiteNotifications,
  editSiteNotification,
  deleteSiteNotification,
} from '../actions/siteNotifications';

// const noties = [
//   {
//     username: 'test Born',
//     time: 'today at 9:11 am',
//     avatar: 'https://steamuserimages-a.akamaihd.net/ugc/933814008881052459/22818793B6D9C730A788E677F998933F9EDDE0B7/',
//     description: 'started following you',
//     recent: true,
//     id: 8,
//   },
//   {
//     username: 'Shiro test',
//     time: 'today at 3:21 pm',
//     avatar: 'http://profilepicturesdp.com/wp-content/uploads/2018/07/matching-profile-pictures-sun-night-4-1.jpg',
//     description: 'started following your organization Taboon Common',
//     recent: true,
//     postCover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Parking_icon.svg/600px-Parking_icon.svg.png',
//     id: 9,
//   },
// ];
const NotificationTooltip = props => (
  <div className="notification-tooltip__container">
    <div className="notification-tooltip__header notification-tooltip__header_new">
      <h3 role="presentation" className="notification-tooltip__title">New notifications</h3>
    </div>

    <div role="presentation" className="notification-tooltip__list notification-tooltip__list_new">
      {Object.values(props.tooltipNotificationsList).filter(i => i.recent).map(item => (
        <div key={item.id} className="notification-tooltip__item notification-tooltip__item_new">
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
    <div role="presentation" className="notification-tooltip__header">
      <h3 className="notification-tooltip__title">Early</h3>
    </div>
    <div className="notification-tooltip__list">
      {Object.values(props.tooltipNotificationsList).filter(i => !i.recent).map(item => (
        <div key={item.id} className="notification-tooltip__item">
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
  addSiteNotifications: PropTypes.func,
  editSiteNotification: PropTypes.func,
  deleteSiteNotification: PropTypes.func,
  tooltipNotificationsList: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  state => ({
    tooltipVisibilty: state.siteNotifications.tooltipVisibilty,
    tooltipNotificationsList: state.siteNotifications.tooltipNotificationsList,
  }),
  dispatch => ({
    addSiteNotifications: data => dispatch(addSiteNotifications(data)),
    editSiteNotification: data => dispatch(editSiteNotification(data)),
    deleteSiteNotification: data => dispatch(deleteSiteNotification(data)),
    hideTooltip: () => dispatch(hideNotificationTooltip()),
  }),
)(NotificationTooltip);
