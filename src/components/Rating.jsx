import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import IconArrowUp from '../components/Icons/ArrowUp';
import IconArrowDown from '../components/Icons/ArrowDown';
import api from '../api/Api';
import { UPVOTE_STATUS, DOWNVOTE_STATUS, NOVOTE_STATUS } from '../utils/posts';
import { showAuthPopup } from '../actions';
import { selectUser } from '../store/selectors';

class Rating extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: this.props.rating,
      choice: this.props.choice,
    };
  }

  componentWillReceiveProps(props) {
    if (this.state.rating !== props.rating) {
      this.setState({
        rating: props.rating,
      });
    }

    if (this.state.choice !== props.choice) {
      this.setState({
        choice: props.choice,
      });
    }
  }

  vote(isUp) {
    if (!this.props.user.id) {
      this.props.showAuthPopup();
      return;
    }

    api.vote(isUp, this.props.postId, this.props.commentId)
      .then((data) => {
        if (data.errors) {
          return;
        }

        this.setState({
          rating: data.current_vote,
          choice: isUp ? UPVOTE_STATUS : DOWNVOTE_STATUS,
        });
      });
  }

  render() {
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
  }
}

Rating.propTypes = {
  postId: PropTypes.number,
  commentId: PropTypes.number,
  rating: PropTypes.number,
  showAuthPopup: PropTypes.func,
  choice: PropTypes.oneOf([UPVOTE_STATUS, DOWNVOTE_STATUS, NOVOTE_STATUS]),
};

Rating.defaultProps = {
  rating: 0,
};

export default connect(
  state => ({
    user: selectUser(state),
  }),
  dispatch => ({
    showAuthPopup: () => dispatch(showAuthPopup()),
  }),
)(Rating);
