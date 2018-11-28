import humps from 'lodash-humps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import UserFollowButton from '../User/UserFollowButton';
import UserCard from '../UserCard';
import { getUserById } from '../../store/users';
import { getPostById } from '../../store/posts';
import { getUserUrl, getUserName } from '../../utils/user';
import { getFileUrl } from '../../utils/upload';
import { selectUser } from '../../store/selectors/user';

const PostHeader = (props) => {
  const post = humps(getPostById(props.posts, props.postId));

  if (!post || !post.user || !post.user.id) {
    return null;
  }

  const user = getUserById(props.users, post.user.id);

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
            rate={Number(user.currentRate)}
          />
        </div>
        <div className="toolbar__side">
          <div className="post-header__follow-button">
            {props.user.id && props.user.id === post.user.id ? null : (
              <UserFollowButton userId={post.user.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

PostHeader.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(state => ({
  users: state.users,
  posts: state.posts,
  user: selectUser(state),
}))(PostHeader);
