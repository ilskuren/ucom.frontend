import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Rating from './Rating';
import { postVote } from '../../actions/posts';

const PostRating = (props) => {
  const post = Object.entries(props.posts.data)
    .map(item => item[1])
    .find(item => item.id === props.postId);

  return (
    <Rating
      currentVote={post.currentVote}
      myselfVote={post.myselfData.myselfVote}
      onClickVoteDown={() => props.postVote({ postId: props.postId, isUp: false })}
      onClickVoteUp={() => props.postVote({ postId: props.postId, isUp: true })}
    />
  );
};

export default connect(
  state => ({
    posts: state.posts,
  }),
  dispatch => bindActionCreators({
    postVote,
  }, dispatch),
)(PostRating);
