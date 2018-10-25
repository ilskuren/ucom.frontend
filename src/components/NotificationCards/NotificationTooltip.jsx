import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import IconClose from 'components/Icons/Close';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NotificationCard from './NotificationCard';
import {
  hideNotificationTooltip,
  addSiteNotifications,
  deleteSiteNotification,
  fetchNotifications,
} from '../../actions/siteNotifications';
import { enableScroll, disableScroll } from '../../utils/scroll';

const isRequiredTime = (arr, isEarly = true) => Object.values(arr)
  .some(i => i.finished === isEarly);

const filterNotifs = (arr, isEarly = true) => Object.values(arr)
  .filter(i => i.finished === isEarly)
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

class NotificationTooltip extends Component {
  componentDidMount() {
    window.addEventListener('NotificationTrigger', this.loadMore);
  }

  componentWillUnmount() {
    window.removeEventListener('NotificationTrigger', this.loadMore);
  }

  loadMore = () => {
    const {
      hasMore,
    } = this.props.notificationsMetadata;
    if (hasMore) {
      this.props.fetchNotifications({
        page: ++this.props.notificationsMetadata.page,
        perPage: this.props.notificationsMetadata.perPage,
      });
    }
  };

  render() {
    const { list, notificationsMetadata } = this.props;
    const newNotifications = filterNotifs(list, false);
    const oldNotifications = filterNotifs(list, true);
    const notificationTrigger = new CustomEvent('NotificationTrigger');

    return (
      <div
        onMouseEnter={() => disableScroll()}
        onMouseLeave={() => enableScroll()}
      >
        <PerfectScrollbar
          className="notification-tooltip__container"
          onYReachEnd={() => {
            window.dispatchEvent(notificationTrigger);
          }}
        >
          <div>
            {isRequiredTime(list, false) &&
              <div className="notification-tooltip__header">
                <h3 className="notification-tooltip__title">New notifications
                </h3>
              </div>
            }

            {!Object.values(list).length &&
              <div className="notification-tooltip__header notification-tooltip__header_center">
                <h3 className="notification-tooltip__title">No notifications</h3>
              </div>
            }

            {newNotifications && newNotifications.length > 0 &&
              <div className="notification-tooltip__list notification-tooltip__list_new">
                <TransitionGroup>
                  {newNotifications.map(item => (
                    <CSSTransition key={item.id} timeout={200} classNames="fade">
                      <div key={item.id} className="notification-tooltip__item notification-tooltip__item_new">
                        <NotificationCard {...item} />
                      </div>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </div>
            }

            {isRequiredTime(list, true) &&
              <div className="notification-tooltip__header">
                <h3 className="notification-tooltip__title">Early</h3>
              </div>
            }

            {oldNotifications && oldNotifications.length > 0 &&
              <div className="notification-tooltip__list">
                <TransitionGroup>
                  {oldNotifications.map(item => (
                    <CSSTransition key={item.id} timeout={200} classNames="fade">
                      <div key={item.id} className="notification-tooltip__item">
                        <NotificationCard {...item} />
                      </div>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </div>
            }

            {notificationsMetadata.hasMore &&
              <div className="notification-tooltip__loading">Loading...</div>
            }
          </div>

          <div
            className="inline__item notification-tooltip__close"
            onClick={() => this.props.hideNotificationTooltip()}
            role="presentation"
          >
            <IconClose />
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

NotificationTooltip.propTypes = {
  hideNotificationTooltip: PropTypes.func.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  list: PropTypes.objectOf(PropTypes.any),
  notificationsMetadata: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  state => ({
    tooltipVisibilty: state.siteNotifications.tooltipVisibilty,
    list: state.siteNotifications.list,
    notificationsMetadata: state.siteNotifications.metadata,
  }),
  dispatch => bindActionCreators({
    addSiteNotifications,
    deleteSiteNotification,
    hideNotificationTooltip,
    fetchNotifications,
  }, dispatch),
)(NotificationTooltip);
