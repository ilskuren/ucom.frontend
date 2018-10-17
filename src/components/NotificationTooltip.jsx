import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconClose from 'components/Icons/Close';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NotificationCard from 'components/NotificationCards/NotificationCard';
import {
  hideNotificationTooltip,
  addSiteNotifications,
  deleteSiteNotification,
} from '../actions/siteNotifications';

const isRequiredTime = (arr, isEarly = true) => Object.values(arr).some(i => (i.finished || i.seen) === isEarly);
const filterNotifs = (arr, isEarly = true) => Object.values(arr)
  .filter(i => (i.finished || i.seen) === isEarly)
  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

const NotificationTooltip = ({ list, hideTooltip }) => {
  const newNotifications = filterNotifs(list, false);
  const oldNotifications = filterNotifs(list, true);

  return (
    <PerfectScrollbar className="notification-tooltip__container">
      {isRequiredTime(list, false) &&
        <div className="notification-tooltip__header notification-tooltip__header_new">
          <h3 className="notification-tooltip__title">New notifications</h3>
        </div>
      }

      {newNotifications && newNotifications.length > 0 && (
        <div className="notification-tooltip__list notification-tooltip__list_new">
          {newNotifications.map(item => (
            <div key={item.id} className="notification-tooltip__item notification-tooltip__item_new">
              <NotificationCard {...item} />
            </div>
          ))}
        </div>
      )}

      {isRequiredTime(list, true) &&
        <div className="notification-tooltip__header">
          <h3 className="notification-tooltip__title">Early</h3>
        </div>
      }

      {oldNotifications && oldNotifications.length > 0 && (
        <div className="notification-tooltip__list">
          {oldNotifications.map(item => (
            <div key={item.id} className="notification-tooltip__item">
              <NotificationCard {...item} />
            </div>
          ))}
        </div>
      )}

      <div
        className="inline__item notification-tooltip__close"
        onClick={() => hideTooltip()}
        role="presentation"
      >
        <IconClose />
      </div>
    </PerfectScrollbar>
  );
};

NotificationTooltip.propTypes = {
  hideTooltip: PropTypes.func,
  // addSiteNotifications: PropTypes.func,
  // deleteSiteNotification: PropTypes.func,
  list: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  state => ({
    tooltipVisibilty: state.siteNotifications.tooltipVisibilty,
    list: state.siteNotifications.list,
  }),
  dispatch => ({
    addSiteNotifications: data => dispatch(addSiteNotifications(data)),
    deleteSiteNotification: data => dispatch(deleteSiteNotification(data)),
    hideTooltip: () => dispatch(hideNotificationTooltip()),
  }),
)(NotificationTooltip);
