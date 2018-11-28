import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FeedForm from '../FeedForm';
import IconEdit from '../../Icons/Edit';
import { escapeQuotes } from '../../../utils/text';
import { getFileUrl } from '../../../utils/upload';
import { updatePost } from '../../../actions/posts';
import { getPostById } from '../../../store/posts';
import { postIsEditable } from '../../../utils/posts';
import DescDirectPost from './DescDirectPost';

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
              message={post.description}
              postId={post.id}
              mainImageFilename={post.mainImageFilename}
              onCancel={this.hideForm}
              onSubmit={(description, mainImageFilename) => {
                this.hideForm();
                this.props.updatePost({
                  postId: post.id,
                  data: { description, mainImageFilename },
                });
              }}
            />
          </div>
        ) : (
          <div className="post__title">
            {(this.props.postTypeId === 10 || post.postTypeId === 10) ? (
              <div>
                {post.mainImageFilename && !this.state.formIsVisible && (
                  <div className="post__cover">
                    <img src={getFileUrl(post.mainImageFilename)} alt="cover" />
                  </div>
                )}
                <div className="toolbar">
                  {post.description &&
                    <div className="toolbar__main toolbar__main_small">
                      <DescDirectPost
                        desc={escapeQuotes(post.description)}
                        limit={100}
                      />
                    </div>
                  }
                  {post.userId === this.props.userId && postIsEditable(post.createdAt) && (
                    <div className="toolbar__side">
                      <button className="button-icon button-icon_edit button-icon_edit_small" onClick={this.showForm}>
                        <IconEdit />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              null
            )}
          </div>
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
  postTypeId: PropTypes.number,
};

export default connect(
  state => ({
    posts: state.posts,
  }),
  dispatch => bindActionCreators({
    updatePost,
  }, dispatch),
)(PostFeedContent);
