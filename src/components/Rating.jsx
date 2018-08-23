import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import IconArrowUp from '../components/Icons/ArrowUp';
import IconArrowDown from '../components/Icons/ArrowDown';

const Rating = ({ rating, choice }) => (
  <div className="rating">
    <div className={cn('rating__icon', { 'rating__icon_red': choice === 'down' })}>
      <IconArrowDown />
    </div>
    <div className={cn('rating__value', {
      'rating__value_up': rating > 0,
      'rating__value_down': rating < 0,
    })}
    >{rating > 0 && '+'}{rating}
    </div>
    <div className={cn('rating__icon', { 'rating__icon_green': choice === 'up' })}>
      <IconArrowUp />
    </div>
  </div>
);

Rating.propTypes = {
  rating: PropTypes.number,
  choice: PropTypes.oneOf('up', 'down'),
};

Rating.defaultProps = {
  rating: 0,
};

export default Rating;
