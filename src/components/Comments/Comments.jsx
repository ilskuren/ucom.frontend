import humps from 'lodash-humps';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import { sortComments } from '../../utils/comments';
import { fetchPost } from '../../actions/posts';
import { getCommentsByEntryId } from '../../store/comments';
import { createComment } from '../../actions/comments';
import { getPostById } from '../../store/posts';
import { getFileUrl } from '../../utils/upload';
import { getOrganizationUrl } from '../../utils/organization';

const Comments = (props) => {
  useEffect(() => {
    props.fetchPost(props.postId);
  }, []);

  const post = humps(getPostById(props.posts, props.postId));

  if (!post) {
    return null;
  }

  const comments = sortComments(getCommentsByEntryId(props.comments, props.postId));

  return (
    <div className="comments">
      {comments && comments.length > 0 && (
        <div className="comments__list">
          <CommentsList commentsIds={comments.map(item => item.id)} postId={props.postId} />
        </div>
      )}

      <div className="comments__form">
        <CommentForm
          showBadge={post.myselfData && post.myselfData.organizationMember}
          badgeTitle={post.organization && post.organization.nickname}
          badgeUrl={post.organization && getFileUrl(post.organization.avatarFilename)}
          badgeLink={post.organization && getOrganizationUrl(post.organization.id)}
          onSubmit={(description) => {
            props.createComment({
              postId: props.postId,
              commentsCount: post.commentsCount,
              data: { description },
            });
          }}
        />
      </div>
    </div>
  );
};

Comments.propTypes = {
  postId: PropTypes.number,
  comments: PropTypes.objectOf(PropTypes.object),
  createComment: PropTypes.func,
  posts: PropTypes.objectOf(PropTypes.object),
};

export default connect(
  state => ({
    posts: state.posts,
    comments: state.comments,
  }),
  dispatch => bindActionCreators({
    createComment,
    fetchPost,
  }, dispatch),
)(Comments);
