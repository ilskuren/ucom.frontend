import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import IconArrowUp from '../components/Icons/ArrowUp';
import IconArrowDown from '../components/Icons/ArrowDown';
import { postUpVote } from '../api';
import { getToken } from '../utils/token';
import { UPVOTE_STATUS, DOWNVOTE_STATUS } from '../utils/posts';

class Rating extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: this.props.rating,
      choice: this.props.choice,
    };
  }

  upvote() {
    if (!this.props.user.id) {
      return;
    }

    postUpVote(this.props.postId, getToken())
      .then((data) => {
        if (data.errors) {
          return;
        }

        this.setState({
          rating: data.current_vote,
          choice: UPVOTE_STATUS,
        });
      });
  }

  render() {
    return (
      <div className="rating">
        <div
          className={cn(
            'rating__icon',
            { 'rating__icon_red': this.state.choice === DOWNVOTE_STATUS },
          )}
        >
          <IconArrowDown />
        </div>

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
          onClick={() => this.upvote()}
          className={cn(
            'rating__icon',
            { 'rating__icon_green': this.state.choice === UPVOTE_STATUS },
          )}
        >
          <IconArrowUp />
        </button>
      </div>
    );
  }
}

Rating.propTypes = {
  postId: PropTypes.number,
  rating: PropTypes.number,
  choice: PropTypes.oneOf([UPVOTE_STATUS, DOWNVOTE_STATUS]),
};

Rating.defaultProps = {
  rating: 0,
};

export default connect(state => ({
  user: state.user,
}))(Rating);
