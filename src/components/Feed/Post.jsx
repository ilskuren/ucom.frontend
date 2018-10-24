import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import React, { PureComponent } from 'react';
import PostRating from '../Rating/PostRating';
import UserCard from '../UserCard';
import IconComment from '../Icons/Comment';
import IconEdit from '../Icons/Edit';
import Comments from '../Comments/Comments';
import LastUserComments from '../Comments/LastUserComments';
import FeedForm from './FeedForm';
import { getPostUrl, getPostTypeById, postIsEditable } from '../../utils/posts';
import { getFileUrl } from '../../utils/upload';
import { getUserName, getUserUrl } from '../../utils/user';
import { escapeQuotes } from '../../utils/text';
import { getPostById } from '../../store/posts';
import { getUserById } from '../../store/users';
import { selectUser } from '../../store/selectors/user';
import { createComment } from '../../actions/comments';
import { updatePost } from '../../actions/posts';

class Post extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formIsVisible: false,
      commentsIsVisible: false,
      timestamp: (new Date()).getTime(),
    };
  }

  toggleComments = () => {
    this.setState({
      timestamp: (new Date()).getTime(),
      commentsIsVisible: !this.state.commentsIsVisible,
    });
  }

  showForm = () => {
    this.setState({ formIsVisible: true });
  }

  hideForm = () => {
    this.setState({ formIsVisible: false });
  }

  render() {
    const post = getPostById(this.props.posts, this.props.id);

    if (!post) {
      return null;
    }

    const user = getUserById(this.props.users, post.userId);

    return (
      <div className="post">
        <div className="post__info-block">
          <div className="post__type"><strong>{getPostTypeById(post.postTypeId)}</strong></div>
          <div className="toolbar__main">{moment(post.updatedAt).fromNow()}</div>
          <div className="toolbar__side">
            <PostRating postId={post.id} />
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
          {this.state.formIsVisible ? (
            <div className="post__form">
              <FeedForm
                message={post.description}
                onCancel={this.hideForm}
                onSubmit={(description) => {
                  this.hideForm();
                  this.props.updatePost({
                    postId: post.id,
                    data: { description },
                  });
                }}
              />
            </div>
          ) : (
            <h1 className="post__title">
              {post.postTypeId === 10 ? (
                <div className="toolbar toolbar_fluid toolbar_small">
                  <div className="toolbar__main">
                    {escapeQuotes(post.description)}
                  </div>
                  {post.userId === this.props.user.id && postIsEditable(post.createdAt) && (
                    <div className="toolbar__side">
                      <button className="button-icon button-icon_edit button-icon_edit_small" onClick={this.showForm}>
                        <IconEdit />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to={getPostUrl(post.id)}>{escapeQuotes(post.title)}</Link>
              )}
            </h1>
          )}

          {post.mainImageFilename && (
            <div className="post__cover">
              <Link to={getPostUrl(post.id)}>
                <img src={getFileUrl(post.mainImageFilename)} alt="cover" />
              </Link>
            </div>
          )}

          {post.leadingText && (
            <h2 className="post__title post__title_leading">{escapeQuotes(post.leadingText)}</h2>
          )}
        </div>

        <div className="post__footer">
          <span
            role="presentation"
            className={classNames(
              'post__comment-count',
              { 'post__comment-count_active': this.state.commentsIsVisible },
            )}
            onClick={this.toggleComments}
          >
            <span className="inline inline_small">
              <span className="inline__item">
                <IconComment />
              </span>
              <span className="inline__item">{post.commentsCount}</span>
            </span>
          </span>
        </div>

        <div className="post__comments">
          {this.state.commentsIsVisible ? (
            <Comments postId={post.id} />
          ) : (
            <LastUserComments postId={post.id} timestamp={this.state.timestamp} />
          )}
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  id: PropTypes.number,
  updatePost: PropTypes.func,
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
)(Post);
