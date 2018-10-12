import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import UserFollowButton from '../User/UserFollowButton';
import UserCard from '../UserCard';
import { getUserById } from '../../store/users';
import { getUserUrl, getUserName } from '../../utils/user';
import { getFileUrl } from '../../utils/upload';

const PostHeader = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  return (
    <div className="post-header">
      <div className="toolbar">
        <div className="toolbar__main">
          <UserCard
            size="big"
            userName={getUserName(user)}
            profileLink={getUserUrl(user.id)}
            avatarUrl={getFileUrl(user.avatarFilename)}
            rate={+user.currentRate}
          />
        </div>
        <div className="toolbar__side">
          <div className="post-header__follow-button">
            <UserFollowButton userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

PostHeader.propTypes = {
  userId: PropTypes.number,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(state => ({
  users: state.users,
}))(PostHeader);
