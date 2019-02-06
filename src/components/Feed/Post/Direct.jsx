import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { getPostById } from '../../../store/posts';
import { selectUser } from '../../../store/selectors/user';
import { createComment } from '../../../actions/comments';
import { getFileUrl } from '../../../utils/upload';
import { getUserName } from '../../../utils/user';
import urls from '../../../utils/urls';
import { getUserById } from '../../../store/users';
import { escapeQuotes } from '../../../utils/text';
import PostFeedHeader from './PostFeedHeader';
import PostFeedContent from './PostFeedContent';
import PostFeedFooter from './PostFeedFooter';

class Direct extends PureComponent {
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
      <div className="post" id={`post-${post.id}`}>
        <PostFeedHeader
          postTypeId={post.postTypeId}
          createdAt={moment(post.createdAt).fromNow()}
          postId={post.id}
          userName={getUserName(user)}
          accountName={user.accountName}
          profileLink={urls.getUserUrl(user.id)}
          avatarUrl={getFileUrl(user.avatarFilename)}
        />

        <PostFeedContent
          postId={this.props.id}
          userId={this.props.user.id}
          postTypeId={post.postTypeId}
          linkText={escapeQuotes(post.description)}
        />

        <PostFeedFooter
          commentsCount={post.commentsCount}
          post={post}
          postTypeId={post.postTypeId}
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

Direct.propTypes = {
  id: PropTypes.number,
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
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
)(Direct);
