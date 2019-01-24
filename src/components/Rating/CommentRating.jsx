import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Rating from './Rating';
import { commentVote } from '../../actions/comments';
import { getCommentById } from '../../store/comments';

const CommentRating = props => (
  <Rating
    disabled={props.comment.userId === props.user.id}
    currentVote={props.comment.currentVote}
    myselfVote={props.comment.myselfData && props.comment.myselfData.myselfVote}
    onClickVoteDown={() => props.commentVote({ postId: props.comment.commentableId, commentId: props.commentId, isUp: false })}
    onClickVoteUp={() => props.commentVote({ postId: props.comment.commentableId, commentId: props.commentId, isUp: true })}
  />
);

CommentRating.propTypes = {
  comment: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    currentVote: PropTypes.number.isRequired,
    myselfData: PropTypes.shape({
      myselfVote: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    commentableId: PropTypes.number.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  commentVote: PropTypes.func.isRequired,
  commentId: PropTypes.number.isRequired,
};

export default connect(
  (state, props) => ({
    comment: getCommentById(state.comments, props.commentId),
    user: state.user.data,
  }),
  dispatch => bindActionCreators({
    commentVote,
  }, dispatch),
)(CommentRating);
