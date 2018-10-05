import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Button from '../Button';
import { selectUser } from '../../store/selectors/user';
import { followUser, unfollowUser } from '../../actions/users';
import { getUserById } from '../../store/users';

const UserFollowButton = (props) => {
  if (!props.userId) {
    return null;
  }

  const owner = getUserById(props.users, props.user.id);
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  const userIsFollow = owner ? owner.iFollow.some(item => item.id === props.userId) : false;

  return (
    <Button
      isStretched
      size="medium"
      theme="transparent"
      withCheckedIcon={userIsFollow}
      text={userIsFollow ? 'Following' : 'Follow'}
      onClick={() => {
        if (!owner) {
          return;
        }

        (userIsFollow ? props.unfollowUser : props.followUser)({
          user,
          userId: owner.id,
          userAccountName: owner.accountName,
        });
      }}
    />
  );
};

export default connect(
  state => ({
    users: state.users,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    followUser,
    unfollowUser,
  }, dispatch),
)(UserFollowButton);
