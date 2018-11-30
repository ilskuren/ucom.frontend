import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Feed from './Feed';
import { getWallFeedIdsByUserId } from '../../store/feeds';
import { createUserCommentPost } from '../../actions/posts';
import { getUserWallFeed, resetFeeds } from '../../actions/feeds';
import { USER_NEWS_FEED_ID } from '../../utils/feed';


class UserFeed extends PureComponent {
  componentDidMount() {
    this.getData(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId) {
      this.getData(nextProps.userId);
    }
  }

  getData(userId) {
    this.props.resetFeeds();
    this.props.getUserWallFeed({ userId, perPage: 10, page: 1 });
  }

  getMoreData = () => {
    const userWallFeed = getWallFeedIdsByUserId(this.props.feeds, this.props.userId);

    if (!userWallFeed) {
      return;
    }

    this.props.getUserWallFeed({
      userId: this.props.userId,
      perPage: userWallFeed.metadata.perPage,
      page: userWallFeed.metadata.page + 1,
    });
  }

  render() {
    const userWallFeed = getWallFeedIdsByUserId(this.props.feeds, this.props.userId) || {};

    return (
      <Feed
        postsIds={userWallFeed.postsIds}
        onClickMore={this.getMoreData}
        loadMoreIsVisible={userWallFeed.metadata && userWallFeed.postsIds.length < userWallFeed.metadata.totalAmount}
        typeFeed={USER_NEWS_FEED_ID}
        userId={this.props.userId}
      />
    );
  }
}

UserFeed.propTypes = {
  userId: PropTypes.number,
  feeds: PropTypes.objectOf(PropTypes.any),
  getUserWallFeed: PropTypes.func,
  resetFeeds: PropTypes.func,
};

export default connect(
  state => ({
    feeds: state.feeds,
  }),
  dispatch => bindActionCreators({
    createUserCommentPost,
    getUserWallFeed,
    resetFeeds,
  }, dispatch),
)(UserFeed);
