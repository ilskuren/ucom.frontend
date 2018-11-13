import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { authSetVisibility } from '../actions/auth';
import { hideNotificationTooltip } from '../actions/siteNotifications';
import { hideMenuPopup } from '../actions/menuPopup';

class Page extends PureComponent {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
      this.props.authSetVisibility(false);
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

export default withRouter(connect(
  null,
  dispatch => bindActionCreators({
    authSetVisibility,
    hideNotificationTooltip,
    hideMenuPopup,
  }, dispatch),
)(Page));
