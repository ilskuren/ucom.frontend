import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Feed from './Feed';
import { getWallFeedIdsByOrganizationId } from '../../store/feeds';
import { resetFeeds, getOrganizationWallFeed } from '../../actions/feeds';
import { ORG_FEED_ID } from '../../utils/feed';

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
    this.props.getOrganizationWallFeed({ organizationId, perPage: 10, page: 1 });
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
    const organizationWallFeed = getWallFeedIdsByOrganizationId(this.props.feeds, this.props.organizationId) || {};

    return (
      <Feed
        postsIds={organizationWallFeed.postsIds}
        onClickMore={this.getMoreData}
        loadMoreIsVisible={organizationWallFeed.metadata && organizationWallFeed.postsIds.length < organizationWallFeed.metadata.totalAmount}
        typeFeed={ORG_FEED_ID}
        organizationId={this.props.organizationId}
      />
    );
  }
}

OrganizationFeed.propTypes = {
  organizationId: PropTypes.number,
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
    resetFeeds,
    getOrganizationWallFeed,
  }, dispatch),
)(OrganizationFeed);
