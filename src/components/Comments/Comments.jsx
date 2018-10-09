import humps from 'lodash-humps';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import { sortComments } from '../../utils/comments';
import { fetchPost } from '../../actions/posts';
import { getCommentsByEntryId } from '../../store/comments';
import { createComment } from '../../actions/comments';
import { getPostById } from '../../store/posts';
import { getFileUrl } from '../../utils/upload';
import { getOrganizationUrl } from '../../utils/organization';

class Comments extends PureComponent {
  componentDidMount() {
    this.props.fetchPost(this.props.postId);
  }

  render() {
    const post = humps(getPostById(this.props.posts, this.props.postId));

    if (!post) {
      return null;
    }

    const comments = sortComments(getCommentsByEntryId(this.props.comments, this.props.postId));

    return (
      <div className="comments">
        {comments && comments.length > 0 && (
          <div className="comments__list">
            <CommentsList commentsIds={comments.map(item => item.id)} postId={this.props.postId} />
          </div>
        )}

        <div className="comments__form">
          <CommentForm
            showBadge={post.myselfData && post.myselfData.organizationMember}
            badgeTitle={post.organization && post.organization.nickname}
            badgeUrl={post.organization && getFileUrl(post.organization.avatarFilename)}
            badgeLink={post.organization && getOrganizationUrl(post.organization.id)}
            onSubmit={(description) => {
              this.props.createComment({
                postId: this.props.postId,
                data: { description },
              });
            }}
          />
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  postId: PropTypes.number,
  comments: PropTypes.objectOf(PropTypes.object),
  fetchPost: PropTypes.func,
  createComment: PropTypes.func,
  posts: PropTypes.objectOf(PropTypes.object),
};

export default connect(
  state => ({
    posts: state.posts,
    comments: state.comments,
  }),
  dispatch => bindActionCreators({
    fetchPost,
    createComment,
  }, dispatch),
)(Comments);
