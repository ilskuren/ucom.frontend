import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Feed from './Feed';
import { createSelfCommentPost } from '../../actions/posts';
import { getNewsFeedIdsByUserId } from '../../store/feeds';
import { removeUserNewsFeed, getUserNewsFeed } from '../../actions/feeds';

class UserNewsFeed extends PureComponent {
  componentDidMount() {
    this.getData(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId) {
      this.getData(nextProps.userId);
    }
  }

  getData(userId) {
    this.props.removeUserNewsFeed({ userId });
    this.props.getUserNewsFeed({
      userId,
      perPage: 10,
      page: 1,
    });
  }

  getMoreData = () => {
    const userNewsFeed = getNewsFeedIdsByUserId(this.props.feeds, this.props.userId);

    if (!userNewsFeed) {
      return;
    }

    this.props.getUserNewsFeed({
      userId: this.props.userId,
      perPage: userNewsFeed.metadata.perPage,
      page: userNewsFeed.metadata.page + 1,
    });
  }

  render() {
    const userNewsFeed = getNewsFeedIdsByUserId(this.props.feeds, this.props.userId);

    if (!userNewsFeed) {
      return null;
    }

    return (
      <Feed
        postsIds={userNewsFeed.postsIds}
        onClickMore={this.getMoreData}
        loadMoreIsVisible={userNewsFeed.postsIds.length < userNewsFeed.metadata.totalAmount}
        onSubmitNewPost={(description) => {
          this.props.createSelfCommentPost({
            userId: this.props.userId,
            data: {
              description,
              post_type_id: 10,
            },
          });
        }}
      />
    );
  }
}

UserNewsFeed.propTypes = {
  userId: PropTypes.number,
  feeds: PropTypes.objectOf(PropTypes.object),
  createSelfCommentPost: PropTypes.func,
  removeUserNewsFeed: PropTypes.func,
  getUserNewsFeed: PropTypes.func,
};

export default connect(
  state => ({
    feeds: state.feeds,
  }),
  dispatch => bindActionCreators({
    createSelfCommentPost,
    removeUserNewsFeed,
    getUserNewsFeed,
  }, dispatch),
)(UserNewsFeed);
