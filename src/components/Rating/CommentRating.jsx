import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Rating from './Rating';
import { commentVote } from '../../actions/comments';
import { getCommentById } from '../../store/comments';
import { selectUser } from '../../store/selectors/user';

const CommentRating = (props) => {
  const comment = getCommentById(props.comments, props.commentId);

  return (
    <Rating
      disabled={comment.userId === props.user.id}
      currentVote={comment.currentVote}
      myselfVote={comment.myselfData && comment.myselfData.myselfVote}
      onClickVoteDown={() => props.commentVote({ postId: comment.commentableId, commentId: props.commentId, isUp: false })}
      onClickVoteUp={() => props.commentVote({ postId: comment.commentableId, commentId: props.commentId, isUp: true })}
    />
  );
};

CommentRating.propTypes = {
  commentVote: PropTypes.func,
  commentId: PropTypes.number,
};

export default connect(
  state => ({
    comments: state.comments,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    commentVote,
  }, dispatch),
)(CommentRating);
