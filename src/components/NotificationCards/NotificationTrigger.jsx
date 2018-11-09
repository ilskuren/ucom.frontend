import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import React, { PureComponent } from 'react';
import NotificationTooltip from './NotificationTooltip';
import IconBell from '../Icons/Bell';
import { showAndFetchNotifications, hideNotificationTooltip, siteNotificationsResetTooltipData } from '../../actions/siteNotifications';

class NotificationTrigger extends PureComponent {
  hideTooltip = () => {
    this.props.hideNotificationTooltip();

    setTimeout(() => {
      this.props.siteNotificationsResetTooltipData();
    }, 300);
  }

  showTooltip = () => {
    this.props.showAndFetchNotifications();
  }

  triggerTooltip = () => (
    this.props.tooltipVisibilty ? this.hideTooltip() : this.showTooltip()
  );

  render() {
    return (
      <div className="notification-tooltip-trigger">
        <CSSTransition
          appear
          unmountOnExit
          timeout={300}
          classNames="fade"
          in={this.props.tooltipVisibilty}
        >
          <NotificationTooltip hideTooltip={this.hideTooltip} />
        </CSSTransition>
        <div
          role="presentation"
          onClick={this.triggerTooltip}
          className={classNames(
            'icon-counter',
            { 'icon-counter_active': this.props.tooltipVisibilty },
          )}
        >
          <div className="icon-counter__icon">
            <IconBell />
          </div>
          <div className="icon-counter__counter">
            <span className="counter counter_top">{this.props.totalUnreadAmount ? this.props.totalUnreadAmount : ''}</span>
          </div>
        </div>
      </div>
    );
  }
}

NotificationTrigger.propTypes = {
  hideNotificationTooltip: PropTypes.func,
  siteNotificationsResetTooltipData: PropTypes.func,
  showAndFetchNotifications: PropTypes.func,
  tooltipVisibilty: PropTypes.bool,
  totalUnreadAmount: PropTypes.number,
};

export default connect(
  state => ({
    tooltipVisibilty: state.siteNotifications.tooltipVisibilty,
    totalUnreadAmount: state.siteNotifications.totalUnreadAmount,
    notificationsMetadata: state.siteNotifications.metadata,
  }),
  dispatch => bindActionCreators({
    showAndFetchNotifications,
    hideNotificationTooltip,
    siteNotificationsResetTooltipData,
  }, dispatch),
)(NotificationTrigger);
