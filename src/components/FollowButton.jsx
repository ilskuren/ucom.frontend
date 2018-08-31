import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from './Button';
import { follow } from '../api';
import { getToken } from '../utils/token';

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

  follow() {
    follow(this.props.userId, getToken())
      .then(() => {
        this.setState({ follow: true });
      });
  }

  render() {
    return (
      <Button
        isStretched
        isDisabled={this.state.follow}
        text={this.state.follow ? 'Following' : 'Follow'}
        size="medium"
        theme="transparent"
        onClick={() => this.follow()}
      />
    );
  }
}

FollowButton.propTypes = {
  follow: PropTypes.bool,
  userId: PropTypes.number,
};

export default FollowButton;
