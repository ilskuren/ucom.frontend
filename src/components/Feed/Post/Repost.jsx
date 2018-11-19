import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { getFileUrl } from '../../../utils/upload';
import { getUserName, getUserUrl } from '../../../utils/user';
import { getPostById } from '../../../store/posts';
import { getUserById } from '../../../store/users';
import { selectUser } from '../../../store/selectors/user';
import { createComment } from '../../../actions/comments';
import { updatePost } from '../../../actions/posts';
import PostFeedHeader from './PostFeedHeader';
import PostFeedContent from './PostFeedContent';
import PostFeedFooter from './PostFeedFooter';
import PostCardSmall from '../../PostMedia/PostCardSmall';
import { getPostUrl, getPostTypeById } from '../../../utils/posts';

class Repost extends PureComponent {
  render() {
    const post = getPostById(this.props.posts, this.props.id);

    if (!post) {
      return null;
    }

    const user = getUserById(this.props.users, post.userId);
    if (!user) {
      return null;
    }

    return (
      <div className="post_repost">
        <PostFeedHeader
          postTypeId={post.postTypeId}
          createdAt={moment(post.createdAt).fromNow()}
          postId={post.id}
          userName={getUserName(user)}
          accountName={user.accountName}
          profileLink={getUserUrl(user.id)}
          avatarUrl={getFileUrl(user.avatarFilename)}
        />

        <div className="post post_grey" id={`post-${post.post.id}`} ref={(el) => { this.el = el; }}>
          <PostFeedHeader
            postTypeId={post.post.postTypeId}
            createdAt={moment(post.post.createdAt).fromNow()}
            postId={post.post.id}
            userName={getUserName(post.post.user)}
            accountName={post.post.user.accountName}
            profileLink={getUserUrl(post.post.user.id)}
            avatarUrl={getFileUrl(post.post.user.avatarFilename)}
          />

          {post.post.postTypeId === 1 ? (
            <PostCardSmall
              onFeed
              coverUrl={getFileUrl(post.mainImageFilename)}
              rate={post.currentRate}
              title={post.title || post.leadingText}
              url={getPostUrl(post.id)}
              userUrl={getUserUrl(post.post.user && post.post.user.id)}
              userImageUrl={getFileUrl(post.post.user && post.post.user.avatarFilename)}
              userName={getUserName(post.post.user)}
              accountName={post.post.user && post.post.user.accountName}
              tags={post.postTypeId && [getPostTypeById(post.postTypeId)]}
              commentsCount={post.postTypeId && post.commentsCount}
              sharesCount={post.postTypeId && post.sharesCount}
            />
          ) : (
            <PostFeedContent
              postId={post.post.id}
              userId={post.post.user.id}
            />
          )}
        </div>

        <PostFeedFooter
          commentsCount={post.commentsCount}
          post={post}
          postTypeId={post.postTypeId}
          pinned={this.props.pinned}
          el={this.el}
          commentsIsVisible={this.props.commentsIsVisible}
          toggleComments={this.props.toggleComments}
          sharePopup={this.props.sharePopup}
          toggleShare={this.props.toggleShare}
          timestamp={this.props.timestamp}
        />
      </div>
    );
  }
}

Repost.propTypes = {
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  pinned: PropTypes.bool,
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
    updatePost,
  }, dispatch),
)(Repost);
