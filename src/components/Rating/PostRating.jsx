import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Rating from './Rating';
import { postVote } from '../../actions/posts';
import { getPostById } from '../../store/posts';

const PostRating = (props) => {
  const post = getPostById(props.posts, props.postId);

  return (
    <Rating
      currentVote={post.currentVote}
      myselfVote={post.myselfData && post.myselfData.myselfVote}
      onClickVoteDown={() => props.postVote({ postId: props.postId, isUp: false })}
      onClickVoteUp={() => props.postVote({ postId: props.postId, isUp: true })}
    />
  );
};

PostRating.propTypes = {
  postVote: PropTypes.func,
  postId: PropTypes.number,
};

export default connect(
  state => ({
    posts: state.posts,
  }),
  dispatch => bindActionCreators({
    postVote,
  }, dispatch),
)(PostRating);
