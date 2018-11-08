import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { getPostById } from '../../store/posts';
import { selectUser } from '../../store/selectors/user';
import { createComment } from '../../actions/comments';
import { getFileUrl } from '../../utils/upload';
import { getUserName, getUserUrl } from '../../utils/user';
import { getPostTypeById } from '../../utils/posts';
import { getUserById } from '../../store/users';
import { getPostUrl, getPostTypeById, postIsEditable, getPinnedPostUrl } from '../../utils/posts';
import PostFeedHeader from './PostFeedHeader';
import PostFeedContent from './PostFeedContent';
import PostFeedFooter from './PostFeedFooter';

class Post extends PureComponent {
  render() {
    const post = getPostById(this.props.posts, this.props.id);

    if (!post) {
      return null;
    }

    const user = getUserById(this.props.users, post.userId);

    return (
      <div className="post" id={`post-${post.id}`} ref={(el) => { this.el = el; }}>
        <PostFeedHeader
          postTypeId={getPostTypeById(post.postTypeId)}
          updatedAt={moment(post.updatedAt).fromNow()}
          postId={post.id}
          userName={getUserName(user)}
          accountName={user.accountName}
          profileLink={getUserUrl(user.id)}
          avatarUrl={getFileUrl(user.avatarFilename)}
        />

        <PostFeedContent
          postId={this.props.id}
          userId={this.props.user.id}
          postTypeId={post.postTypeId}
          linkUrl={getPinnedPostUrl(post)}
        />

        <PostFeedFooter
          commentsCount={post.commentsCount}
          post={post}
          pinned={this.props.pinned}
          el={this.el}
        />
      </div>
    );
  }
}

Post.propTypes = {
  id: PropTypes.number,
  pinned: PropTypes.bool,
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(
  state => ({
    posts: state.posts,
    users: state.users,
    comments: state.comments,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    createComment,
  }, dispatch),
)(Post);
