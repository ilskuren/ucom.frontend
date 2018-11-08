import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import React, { PureComponent } from 'react';
import PostRating from '../Rating/PostRating';
import RepostRating from '../Rating/RepostRating';
import UserCard from '../UserCard';
import IconComment from '../Icons/Comment';
import IconShare from '../Icons/Share';
import IconRepost from '../Icons/Repost';
import Comments from '../Comments/Comments';
import ShareBlock from './ShareBlock';
import LastUserComments from '../Comments/LastUserComments';
import FeedForm from './FeedForm';
import { getPostUrl, getPostTypeById, getPinnedPostUrl } from '../../utils/posts';
import { getFileUrl } from '../../utils/upload';
import { getUserName, getUserUrl } from '../../utils/user';
import { escapeQuotes } from '../../utils/text';
import { getPostById } from '../../store/posts';
import { getUserById } from '../../store/users';
import { selectUser } from '../../store/selectors/user';
import { createComment } from '../../actions/comments';
import { updatePost } from '../../actions/posts';
import { scrollTo } from '../../utils/scroll';

import PostFeedHeader from './PostFeedHeader';
import PostFeedContent from './PostFeedContent';
import PostFeedFooter from './PostFeedFooter';

const POST_TOP_OFFSET = 20;

class Repost extends PureComponent {
  render() {
    const post = getPostById(this.props.posts, this.props.id);

    if (!post) {
      return null;
    }

    const user = getUserById(this.props.users, post.userId);

    return (
      <div className="repost">
        <PostFeedHeader
          postTypeId={getPostTypeById(post.postTypeId)}
          updatedAt={moment(post.updatedAt).fromNow()}
          postId={post.id}
          userName={getUserName(user)}
          accountName={user.accountName}
          profileLink={getUserUrl(user.id)}
          avatarUrl={getFileUrl(user.avatarFilename)}
        />

        <div className="post post--grey" id={`post-${post.post.id}`} ref={(el) => { this.el = el; }}>
          <PostFeedHeader
            postTypeId={getPostTypeById(post.post.postTypeId)}
            updatedAt={moment(post.post.updatedAt).fromNow()}
            postId={post.post.id}
            userName={getUserName(post.post.user)}
            accountName={post.post.user.accountName}
            profileLink={getUserUrl(post.post.user.id)}
            avatarUrl={getFileUrl(post.post.user.avatarFilename)}
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
      </div>
    );
  }
}

Repost.propTypes = {
  // updatePost: PropTypes.func,
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
    updatePost,
  }, dispatch),
)(Repost);
