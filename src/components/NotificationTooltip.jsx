import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconClose from 'components/Icons/Close';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NotificationCard from 'components/NotificationCards/NotificationCard';
import {
  hideNotificationTooltip,
  addSiteNotifications,
  editSiteNotification,
  deleteSiteNotification,
} from '../actions/siteNotifications';

const isRequiredTime = (arr, isEarly = true) => Object.values(arr).some(i => (i.finished || i.seen) === isEarly);
const filterNotifs = (arr, isEarly = true) => Object.values(arr)
  .filter(i => (i.finished || i.seen) === isEarly)
  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

const NotificationTooltip = ({ tooltipNotificationsList, hideTooltip }) => (
  <PerfectScrollbar className="notification-tooltip__container">
    {isRequiredTime(tooltipNotificationsList, false) &&
      <div className="notification-tooltip__header notification-tooltip__header_new">
        <h3 className="notification-tooltip__title">New notifications</h3>
      </div>
      }

    <div className="notification-tooltip__list notification-tooltip__list_new">
      {filterNotifs(tooltipNotificationsList, false).map(item => (
        <div key={item.id} className="notification-tooltip__item notification-tooltip__item_new">
          <NotificationCard
            {...item}
          />
        </div>
      ))}
    </div>
    {isRequiredTime(tooltipNotificationsList, true) &&
      <div className="notification-tooltip__header">
        <h3 className="notification-tooltip__title">Early</h3>
      </div>
      }
    <div className="notification-tooltip__list">
      {filterNotifs(tooltipNotificationsList, true).map(item => (
        <div key={item.id} className="notification-tooltip__item">
          <NotificationCard
            {...item}
          />
        </div>
        ))}
    </div>

    <div
      className="inline__item notification-tooltip__close"
      onClick={() => hideTooltip()}
      role="presentation"
    >
      <IconClose />
    </div>
  </PerfectScrollbar>
);
NotificationTooltip.propTypes = {
  hideTooltip: PropTypes.func,
  // addSiteNotifications: PropTypes.func,
  // editSiteNotification: PropTypes.func,
  // deleteSiteNotification: PropTypes.func,
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
