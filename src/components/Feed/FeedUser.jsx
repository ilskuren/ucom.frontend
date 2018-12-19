import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { feedReset, feedGetUserPosts, feedCreatePost } from '../../actions/feed';
import { FEED_PER_PAGE } from '../../utils/feed';
import { POST_TYPE_DIRECT_ID } from '../../utils/posts';
import Feed from './FeedView';

const FeedUser = (props) => {
  const onClickLoadMore = () => {
    feedGetUserPosts(props.feedTypeId, {
      page: props.feed.metadata.page + 1,
      perPage: FEED_PER_PAGE,
      userId: props.userId,
      organizationId: props.organizationId,
    });
  };

  const onSubmitPostForm = (description, mainImageFilename) => {
    feedCreatePost(props.feedTypeId, {
      organizationId: props.organizationId || null,
      userId: props.userId || null,
      data: {
        description,
        mainImageFilename,
        postTypeId: POST_TYPE_DIRECT_ID,
      },
    });
  };

  useEffect(() => {
    feedReset();
    feedGetUserPosts(props.feedTypeId, {
      page: 1,
      perPage: FEED_PER_PAGE,
      userId: props.userId,
      organizationId: props.organizationId,
    });
  }, [props.userId, props.organizationId]);

  return (
    <Feed
      hasMore={props.feed.metadata.hasMore}
      postIds={props.feed.postIds}
      loading={props.feed.loading}
      onClickLoadMore={onClickLoadMore}
      onSubmitPostForm={onSubmitPostForm}
    />
  );
};

FeedUser.propTypes = {
  feed: PropTypes.objectOf(PropTypes.any).isRequired,
  feedTypeId: PropTypes.number.isRequired,
  userId: PropTypes.number,
  organizationId: PropTypes.number,
};

export default connect(state => ({
  feed: state.feed,
}))(FeedUser);
