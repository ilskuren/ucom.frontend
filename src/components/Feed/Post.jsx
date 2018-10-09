import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import React, { PureComponent } from 'react';
import PostRating from '../Rating/PostRating';
import UserCard from '../UserCard';
import IconComment from '../Icons/Comment';
import Comments from '../Comments/Comments';
import LastUserComments from '../Comments/LastUserComments';
import { getPostUrl, getPostTypeById } from '../../utils/posts';
import { getFileUrl } from '../../utils/upload';
import { getUserName, getUserUrl } from '../../utils/user';
import { getPostById } from '../../store/posts';
import { getUserById } from '../../store/users';
import { selectUser } from '../../store/selectors/user';
import { createComment } from '../../actions/comments';

class Post extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      commentsIsVisible: false,
      timestamp: (new Date()).getTime(),
    };
  }

  toggleComments() {
    this.setState({
      timestamp: (new Date()).getTime(),
      commentsIsVisible: !this.state.commentsIsVisible,
    });
  }

  render() {
    const post = getPostById(this.props.posts, this.props.id);

    if (!post) {
      return null;
    }

    const user = getUserById(this.props.users, post.userId);

    return (
      <div className="post">
        <div className="post__type">{getPostTypeById(post.postTypeId)}</div>

        <div className="post__header">
          <div className="toolbar">
            <div className="toolbar__main">{moment(post.updatedAt).fromNow()}</div>

            <div className="toolbar__side">
              <PostRating postId={post.id} />
            </div>
          </div>
        </div>

        {user && (
          <div className="post__user">
            <UserCard
              sign="@"
              userName={getUserName(user)}
              accountName={user.accountName}
              profileLink={getUserUrl(user.id)}
              avatarUrl={getFileUrl(user.avatarFilename)}
            />
          </div>
        )}

        <div className="post__content">
          <h1 className="post__title">
            <Link to={getPostUrl(post.id)}>{post.title}</Link>
          </h1>

          {post.leadingText && (
            <h2 className="post__title post__title_leading">{post.leadingText}</h2>
          )}

          {post.mainImageFilename && (
            <div className="post__cover">
              <Link to={getPostUrl(post.id)}>
                <img src={getFileUrl(post.mainImageFilename)} alt="cover" />
              </Link>
            </div>
          )}
        </div>

        <div className="post__footer">
          <div
            role="presentation"
            className={classNames(
              'post__comment-count',
              { 'post__comment-count_active': this.state.commentsIsVisible },
            )}
            onClick={() => this.toggleComments()}
          >
            <div className="inline inline_small">
              <div className="inline__item">
                <IconComment />
              </div>
              {post.postStats && (
                <div className="inline__item">{post.postStats.commentsCount}</div>
              )}
            </div>
          </div>
        </div>

        {this.props.user.id && (
          <div className="post__comments">
            {this.state.commentsIsVisible ? (
              <Comments postId={post.id} />
            ) : (
              <LastUserComments postId={post.id} timestamp={this.state.timestamp} />
            )}
          </div>
        )}
      </div>
    );
  }
}

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
