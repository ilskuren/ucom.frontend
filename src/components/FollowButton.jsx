import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from './Button';
import { follow } from '../api';
import { getToken } from '../utils/token';

class FollowButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  follow() {
    follow(this.props.userId, getToken());
  }

  render() {
    return (
      <Button
        isStretched
        text="Follow"
        size="medium"
        theme="transparent"
        onClick={() => this.follow()}
      />
    );
  }
}

FollowButton.propTypes = {
  userId: PropTypes.number,
};

export default FollowButton;
