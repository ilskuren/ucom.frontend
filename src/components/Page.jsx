import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { hideAuthPopup } from '../actions';

class Page extends PureComponent {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      this.props.hideAuthPopup();
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
};

export default withRouter(connect(
  null,
  dispatch => ({
    hideAuthPopup: () => dispatch(hideAuthPopup()),
  }),
)(Page));
