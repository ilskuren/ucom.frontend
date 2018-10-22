import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Feed from './Feed';
import { createOrganizationsCommentPost } from '../../actions/posts';
import { getWallFeedIdsByOrganizationId } from '../../store/feeds';
import { resetFeeds, getOrganizationWallFeed } from '../../actions/feeds';

class OrganizationFeed extends PureComponent {
  componentDidMount() {
    this.getData(this.props.organizationId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.organizationId !== nextProps.organizationId) {
      this.getData(nextProps.organizationId);
    }
  }

  getData(organizationId) {
    this.props.resetFeeds();
    this.props.getOrganizationWallFeed({
      organizationId,
      perPage: 10,
      page: 1,
    });
  }

  getMoreData = () => {
    const organizationWallFeed = getWallFeedIdsByOrganizationId(this.props.feeds, this.props.organizationId);

    if (!organizationWallFeed) {
      return;
    }

    this.props.getOrganizationWallFeed({
      organizationId: this.props.organizationId,
      perPage: organizationWallFeed.metadata.perPage,
      page: organizationWallFeed.metadata.page + 1,
    });
  }

  render() {
    const organizationWallFeed = getWallFeedIdsByOrganizationId(this.props.feeds, this.props.organizationId);

    if (!organizationWallFeed) {
      return null;
    }
    return (
      <Feed
        postsIds={organizationWallFeed.postsIds}
        onClickMore={this.getMoreData}
        loadMoreIsVisible={organizationWallFeed.metadata && organizationWallFeed.postsIds.length < organizationWallFeed.metadata.totalAmount}
        onSubmitNewPost={(description) => {
          this.props.createOrganizationsCommentPost({
            organizationId: this.props.organizationId,
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

OrganizationFeed.propTypes = {
  organizationId: PropTypes.number,
  createOrganizationsCommentPost: PropTypes.func,
  resetFeeds: PropTypes.func,
  getOrganizationWallFeed: PropTypes.func,
  feeds: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  state => ({
    posts: state.posts,
    feeds: state.feeds,
  }),
  dispatch => bindActionCreators({
    createOrganizationsCommentPost,
    resetFeeds,
    getOrganizationWallFeed,
  }, dispatch),
)(OrganizationFeed);
