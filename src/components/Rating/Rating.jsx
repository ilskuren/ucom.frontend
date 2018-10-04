import React from 'react';
import classNames from 'classnames';
import IconArrowDown from '../Icons/ArrowDown';
import IconArrowUp from '../Icons/ArrowUp';
import { UPVOTE_STATUS, DOWNVOTE_STATUS } from '../../utils/posts';

const Rating = props => (
  <div className="rating">
    <button
      onClick={() => props.onClickVoteDown()}
      className={classNames(
        'rating__icon',
        { 'rating__icon_red': props.myselfVote === DOWNVOTE_STATUS },
      )}
    >
      <IconArrowDown />
    </button>

    <div
      className={classNames(
        'rating__value',
        { 'rating__value_up': props.currentVote > 0 },
        { 'rating__value_down': props.currentVote < 0 },
      )}
    >
      {props.currentVote > 0 && '+'}{props.currentVote}
    </div>

    <button
      onClick={() => props.onClickVoteUp()}
      className={classNames(
        'rating__icon',
        { 'rating__icon_green': props.myselfVote === UPVOTE_STATUS },
      )}
    >
      <IconArrowUp />
    </button>
  </div>
);

export default Rating;
