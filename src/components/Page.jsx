import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { hideAuthPopup } from '../actions';
import { hideNotificationTooltip } from '../actions/siteNotifications';
import { hideMenuPopup } from '../actions/menuPopup';

class Page extends PureComponent {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
      this.props.hideAuthPopup();
      this.props.hideNotificationTooltip();
      this.props.hideMenuPopup();
    }
  }

  render() {
    return (
      <div className="page">
        {this.props.children}
      </div>
    );
  }
}

Page.propTypes = {
  hideAuthPopup: PropTypes.func,
  hideNotificationTooltip: PropTypes.func,
  hideMenuPopup: PropTypes.func,
};

export default withRouter(connect(
  null,
  dispatch => bindActionCreators({
    hideAuthPopup,
    hideNotificationTooltip,
    hideMenuPopup,
  }, dispatch),
)(Page));
