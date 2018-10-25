import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tippy';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import NotificationTooltip from './NotificationTooltip';
import IconBell from '../Icons/Bell';
import { showAndFetchNotifications, hideNotificationTooltip, resetNotificationTooltipData } from '../../actions/siteNotifications';
import { enableScroll, disableScroll } from '../../utils/scroll';

class NotificationTrigger extends PureComponent {
  hideTooltip = () => {
    this.props.hideNotificationTooltip();

    setTimeout(() => {
      this.props.resetNotificationTooltipData();
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
      <Tooltip
        onHide={() => enableScroll()}
        onShow={() => disableScroll()}
        open={this.props.tooltipVisibilty}
        onRequestClose={this.hideTooltip}
        html={<NotificationTooltip hideTooltip={this.hideTooltip} />}
        theme="notification"
        arrow
        position="top-start"
        arrowSize="big"
        hideOnClick={false}
        interactive
        useContext
      >
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
      </Tooltip>
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
