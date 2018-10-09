import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import { sortComments } from '../../utils/comments';
import { getCommentsByEntryId } from '../../store/comments';
import { createComment } from '../../actions/comments';
import { selectUser } from '../../store/selectors/user';
import { getPostById } from '../../store/posts';
import { getFileUrl } from '../../utils/upload';
import { getOrganizationUrl } from '../../utils/organization';

const LastUserComments = (props) => {
  const post = getPostById(props.posts, props.postId);

  if (!post) {
    return null;
  }

  const commentsIds = sortComments(getCommentsByEntryId(props.comments, props.postId)
    .filter(item => item.userId === props.user.id)
    .filter(item => new Date(item.createdAt) > props.timestamp))
    .map(item => item.id);

  return (
    <div className="comments">
      {commentsIds && commentsIds.length > 0 && (
        <div className="comments__list">
          <CommentsList
            postId={props.postId}
            commentsIds={commentsIds}
          />
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
              data: { description },
            });
          }}
        />
      </div>
    </div>
  );
};

LastUserComments.propTypes = {
  postId: PropTypes.number,
  comments: PropTypes.objectOf(PropTypes.object),
  timestamp: PropTypes.number,
  createComment: PropTypes.func,
};

export default connect(
  state => ({
    posts: state.posts,
    comments: state.comments,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    createComment,
  }, dispatch),
)(LastUserComments);
