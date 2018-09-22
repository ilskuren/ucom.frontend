import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from './Button';
import { follow, unfollow } from '../api';
import { getToken } from '../utils/token';
import { showAuthPopup } from '../actions';

class FollowButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      follow: this.props.follow,
    };
  }

  componentWillReceiveProps({ follow }) {
    this.setState({ follow });
  }

  toggleFollow() {
    if (!this.props.user.id) {
      this.props.showAuthPopup();
      return;
    }

    (this.state.follow ? unfollow : follow)(
      this.props.userId,
      getToken(),
      this.props.user.accountName,
      this.props.userAccountName,
    )
      .then((data) => {
        if (data.errors) {
          return;
        }

        this.setState(prevState => ({
          follow: !prevState.follow,
        }));
      });
  }

  render() {
    return (
      <Button
        isStretched={this.props.isStretched}
        withCheckedIcon={this.state.follow}
        text={this.state.follow ? 'Following' : 'Follow'}
        size="medium"
        theme="transparent"
        onClick={() => this.toggleFollow()}
      />
    );
  }
}

FollowButton.propTypes = {
  showAuthPopup: PropTypes.func,
  follow: PropTypes.bool,
  isStretched: PropTypes.bool,
  userId: PropTypes.number,
  showAuthPopup: PropTypes.func,
  userAccountName: PropTypes.string,
};

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    showAuthPopup: () => dispatch(showAuthPopup()),
  }),
)(FollowButton);
