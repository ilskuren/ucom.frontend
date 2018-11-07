import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FeedForm from './FeedForm';
import IconEdit from '../Icons/Edit';
import { escapeQuotes } from '../../utils/text';
import { getFileUrl } from '../../utils/upload';
import { updatePost } from '../../actions/posts';
import { getPostById } from '../../store/posts';
import { getPostUrl, postIsEditable, getPinnedPostUrl } from '../../utils/posts';

class PostFeedContent extends PureComponent {
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
      <div className="post__content">
        {this.state.formIsVisible ? (
          <div className="post__form">
            <FeedForm
              message={post.message}
              onCancel={this.hideForm}
              onSubmit={(description) => {
                this.hideForm();
                this.props.updatePost({
                  postId: post.postId,
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
                  <Link to={getPinnedPostUrl(post)}>{escapeQuotes(post.description)}</Link>
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
    );
  }
}

PostFeedContent.propTypes = {
  postId: PropTypes.number,
  userId: PropTypes.number,
  updatePost: PropTypes.func,
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(
  state => ({
    posts: state.posts,
  }),
  dispatch => bindActionCreators({
    updatePost,
  }, dispatch),
)(PostFeedContent);
