import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FeedForm from '../FeedForm';
import IconEdit from '../../Icons/Edit';
import IconCloud from '../../Icons/Cloud';
import UserCard from '../../UserCard';
import Rate from '../../Rate';
import { escapeQuotes } from '../../../utils/text';
import { getFileUrl } from '../../../utils/upload';
import { updatePost } from '../../../actions/posts';
import { getPostById } from '../../../store/posts';
import { getPostUrl, postIsEditable, getPostTypeById } from '../../../utils/posts';

class PostMediaContent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formIsVisible: false,
    };
  }

  showForm = () => {
    this.setState({ formIsVisible: true });
  }

  hideForm = () => {
    this.setState({ formIsVisible: false });
  }

  render() {
    const post = getPostById(this.props.posts, this.props.postId);

    if (!post) {
      return null;
    }

    return (
      <div className="post__content post__content_media-small">

        <div className="post__cover">
          {post.mainImageFilename ? (
            <Link to={getPostUrl(post.id)} className="post__cover_head">
              <img src={getFileUrl(post.mainImageFilename)} alt="cover" className="post__cover-media" />
            </Link>
          ) : (
            <Link to={getPostUrl(post.id)} className="post__cover_head">
              <div alt="cover" className="post__cover-media post__cover-media_none" />
              <IconCloud className="post__icon-cloud" />
            </Link>
          )}
          {post.currentRate && (
            <Rate
              className="post__rate_media"
              value={post.currentRate}
            />
          )}

          <div className="post__content_info">
            <div>
              {post.postTypeId && (
                <div className="post__type_media">{getPostTypeById(post.postTypeId)}</div>
              )}

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
                <h1 className="post__title post__title_media">
                  {(this.props.postTypeId === 10 || post.postTypeId === 10) ? (
                    <div className="toolbar toolbar_fluid toolbar_small">
                      <div className="toolbar__main">
                        {escapeQuotes(post.description)}
                      </div>
                      {post.userId === this.props.userId && postIsEditable(post.createdAt) && (
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
            </div>
            {this.props.accountName && (
              <div className="post__user">
                <UserCard
                  sign="@"
                  userName={this.props.userName}
                  accountName={this.props.accountName}
                  profileLink={this.props.profileLink}
                  avatarUrl={this.props.avatarUrl}
                />
              </div>
            )}
          </div>

          <Rate
            className="post__rate_media-comments"
            value={post.commentsCount}
            dimension=""
            label="Comments"
          />
        </div>
      </div>
    );
  }
}

PostMediaContent.propTypes = {
  postId: PropTypes.number,
  userId: PropTypes.number,
  updatePost: PropTypes.func,
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
  postTypeId: PropTypes.number,
};

export default connect(
  state => ({
    posts: state.posts,
  }),
  dispatch => bindActionCreators({
    updatePost,
  }, dispatch),
)(PostMediaContent);
