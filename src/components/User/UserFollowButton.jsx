import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Button from '../Button';
import { selectUser } from '../../store/selectors/user';
import { followUser, unfollowUser } from '../../actions/users';
import { getUserById } from '../../store/users';
import { authShowPopup } from '../../actions/auth';

const UserFollowButton = (props) => {
  if (!props.userId) {
    return null;
  }

  const owner = getUserById(props.users, props.user.id) || {};
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  const userIsFollow = props.user.id ? (owner.iFollow || []).some(item => +item.id === +props.userId) : false;

  const isOwner = props.user.id && +owner.id === +user.id;

  return (
    <Button
      isStretched
      isDisabled={isOwner}
      size="medium"
      theme="transparent"
      withCheckedIcon={userIsFollow || isOwner}
      text={userIsFollow || isOwner ? 'Following' : 'Follow'}
      onClick={() => {
        if (!props.user.id) {
          props.authShowPopup();
          return;
        }

        (userIsFollow ? props.unfollowUser : props.followUser)({ user, owner });
      }}
    />
  );
};

UserFollowButton.propTypes = {
  unfollowUser: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  authShowPopup: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(
  state => ({
    users: state.users,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    followUser,
    unfollowUser,
    authShowPopup,
  }, dispatch),
)(UserFollowButton);
