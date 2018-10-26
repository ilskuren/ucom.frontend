import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Tooltip } from 'react-tippy';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import React, { PureComponent, Fragment } from 'react';
import NotificationTooltip from './NotificationTooltip';
import IconBell from '../Icons/Bell';
import { showAndFetchNotifications, hideNotificationTooltip, resetNotificationTooltipData } from '../../actions/siteNotifications';
import { enableScroll, disableScroll } from '../../utils/scroll';

class NotificationTrigger extends PureComponent {
  hideTooltip = () => {
    this.props.hideNotificationTooltip();
    enableScroll();

    setTimeout(() => {
      this.props.resetNotificationTooltipData();
    }, 300);
  }

  showTooltip = () => {
    this.props.showAndFetchNotifications();
    this.resizeTooltip();
  }

  triggerTooltip = () => (
    this.props.tooltipVisibilty ? this.hideTooltip() : this.showTooltip()
  );

  resizeTooltip = () => {
    if (window.matchMedia('(min-width: 787px)').matches) {
      enableScroll();
    } else {
      disableScroll();
    }
  }
  render() {
    return (
      // <Tooltip
      //   open={this.props.tooltipVisibilty}
      //   onRequestClose={this.hideTooltip}
      //   html={<NotificationTooltip hideTooltip={this.hideTooltip} />}
      //   theme="notification"
      //   arrow
      //   position="top-start"
      //   arrowSize="big"
      //   hideOnClick={false}
      //   interactive
      //   useContext
      //   sticky
      //   stickyDuration={0}
      // >
      <Fragment>
        <CSSTransition
          timeout={300}
          appear
          in={this.props.tooltipVisibilty}
          classNames="fade"
          unmountOnExit
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
      </Fragment>
    );
  }
}

NotificationTrigger.propTypes = {
  hideNotificationTooltip: PropTypes.func,
  resetNotificationTooltipData: PropTypes.func,
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
    resetNotificationTooltipData,
  }, dispatch),
)(NotificationTrigger);
