import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { getPostTypeById } from '../../utils/posts';
import { getPostById } from '../../store/posts';
import { selectUser } from '../../store/selectors/user';
import { createComment } from '../../actions/comments';
import PostFeedHeader from './PostFeedHeader';
import PostFeedContent from './PostFeedContent';
import PostFeedFooter from './PostFeedFooter';

class Post extends PureComponent {
  render() {
    const post = getPostById(this.props.posts, this.props.id);

    if (!post) {
      return null;
    }

    return (
      <div className="post" id={`post-${post.id}`} ref={(el) => { this.el = el; }}>
        <PostFeedHeader
          postTypeId={getPostTypeById(post.postTypeId)}
          updatedAt={moment(post.updatedAt).fromNow()}
          postId={post.id}
          userId={post.userId}
        />

        <PostFeedContent
          postId={this.props.id}
          userId={this.props.user.id}
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
