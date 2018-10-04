import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';
import IconArrowDown from '../Icons/ArrowDown';
import IconArrowUp from '../Icons/ArrowUp';
import { postVoteUp, postVoteDown } from '../../actions/posts';
import { UPVOTE_STATUS, DOWNVOTE_STATUS } from '../../utils/posts';

const PostRating = (props) => {
  const post = Object.entries(props.posts.data)
    .map(item => item[1])
    .find(item => item.id === props.postId);

  return (
    <div className="rating">
      <button
        onClick={() => props.postVoteDown(props.postId)}
        className={classNames(
          'rating__icon',
          { 'rating__icon_red': post.myselfData.myselfVote === DOWNVOTE_STATUS },
        )}
      >
        <IconArrowDown />
      </button>

      <div
        className={classNames(
          'rating__value',
          { 'rating__value_up': post.currentVote > 0 },
          { 'rating__value_down': post.currentVote < 0 },
        )}
      >
        {post.currentVote > 0 && '+'}{post.currentVote}
      </div>

      <button
        onClick={() => props.postVoteUp(props.postId)}
        className={classNames(
          'rating__icon',
          { 'rating__icon_green': post.myselfData.myselfVote === UPVOTE_STATUS },
        )}
      >
        <IconArrowUp />
      </button>
    </div>
  );
};

export default connect(
  state => ({
    posts: state.posts,
  }),
  dispatch => bindActionCreators({
    postVoteUp,
    postVoteDown,
  }, dispatch),
)(PostRating);
