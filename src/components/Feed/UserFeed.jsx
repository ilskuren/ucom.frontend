import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Feed from './Feed';
import { getWallFeedIdsByUserId } from '../../store/feeds';
import { createUserCommentPost } from '../../actions/posts';
import { getUserWallFeed, removeWallFeedPosts } from '../../actions/feeds';

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
    this.props.removeWallFeedPosts({ userId });
    this.props.getUserWallFeed({
      userId,
      perPage: 10,
      page: 1,
    });
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
    const userWallFeed = getWallFeedIdsByUserId(this.props.feeds, this.props.userId);

    if (!userWallFeed) {
      return null;
    }

    return (
      <Feed
        postsIds={userWallFeed.postsIds}
        onClickMore={this.getMoreData}
        loadMoreIsVisible={userWallFeed.postsIds.length < userWallFeed.metadata.totalAmount}
        onSubmitNewPost={(description) => {
          this.props.createUserCommentPost({
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

UserFeed.propTypes = {
  userId: PropTypes.number,
  feeds: PropTypes.objectOf(PropTypes.any),
  createUserCommentPost: PropTypes.func,
  getUserWallFeed: PropTypes.func,
  removeWallFeedPosts: PropTypes.func,
};

export default connect(
  state => ({
    feeds: state.feeds,
  }),
  dispatch => bindActionCreators({
    createUserCommentPost,
    getUserWallFeed,
    removeWallFeedPosts,
  }, dispatch),
)(UserFeed);
