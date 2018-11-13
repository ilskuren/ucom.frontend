import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from './Button';
import api from '../api';
import { getToken } from '../utils/token';
import { authShowPopup } from '../actions/auth';
import { selectUser } from '../store/selectors/user';

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
      this.props.authShowPopup();
      return;
    }

    let apiMethod;

    if (this.props.isOrganization) {
      apiMethod = this.state.follow ? api.unfollowOrganization : api.followOrganization;
    } else {
      apiMethod = this.state.follow ? api.unfollow : api.follow;
    }

    apiMethod(
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
  authShowPopup: PropTypes.func,
  follow: PropTypes.bool,
  isStretched: PropTypes.bool,
  userId: PropTypes.number,
  userAccountName: PropTypes.string,
  isOrganization: PropTypes.bool,
};

FollowButton.defaultProps = {
  isOrganization: false,
};

export default connect(
  state => ({
    user: selectUser(state),
  }),
  dispatch => ({
    authShowPopup: () => dispatch(authShowPopup()),
  }),
)(FollowButton);
