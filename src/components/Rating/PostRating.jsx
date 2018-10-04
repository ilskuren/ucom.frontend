import React from 'react';
import { postVoteUp, postVoteDown } from '../../actions/posts';

const PostRating = (props) => {
  const post = Object.entries(props.posts.data)
    .map(item => item[1])
    .find(item => item.id === props.postId);

  return (
    <div className="rating">
      <button
        onClick={() => this.vote(false)}
        className={cn(
          'rating__icon',
          { 'rating__icon_red': this.state.choice === DOWNVOTE_STATUS },
        )}
      >
        <IconArrowDown />
      </button>

      <div
        className={cn(
          'rating__value',
          { 'rating__value_up': this.state.rating > 0 },
          { 'rating__value_down': this.state.rating < 0 },
        )}
      >
        {this.state.rating > 0 && '+'}{this.state.rating}
      </div>

      <button
        onClick={() => this.vote(true)}
        className={cn(
          'rating__icon',
          { 'rating__icon_green': this.state.choice === UPVOTE_STATUS },
        )}
      >
        <IconArrowUp />
      </button>
    </div>
  );
};

export default PostRating;
