import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import loader from '../../utils/loader';
import api from '../../api';
import { USER_NEWS_FEED_ID, USER_WALL_FEED_ID, ORGANIZATION_FEED_ID } from '../../utils/feed';
import FeedInput from './FeedInput';
import { POST_TYPE_DIRECT_ID } from '../../utils/posts';
import Post from './Post/Post';
import LoadMore from './LoadMore';
import { addPosts } from '../../actions/posts';

const getFeedFunctions = {
  [USER_NEWS_FEED_ID]: api.getUserNewsFeed.bind(api),
  [USER_WALL_FEED_ID]: api.getUserWallFeed.bind(api),
  [ORGANIZATION_FEED_ID]: api.getOrganizationWallFeed.bind(api),
};

const createCommentPostFunctions = {
  [USER_NEWS_FEED_ID]: api.createUserCommentPost.bind(api),
  [USER_WALL_FEED_ID]: api.createUserCommentPost.bind(api),
  [ORGANIZATION_FEED_ID]: api.createOrganizationsCommentPost.bind(api),
};

const Feed = (props) => {
  const [postIds, setPostIds] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPosts = async ({ perPage, page }) => {
    loader.start();
    setLoading(true);

    try {
      const params = {
        page,
        perPage,
        userId: props.userId,
        organizationId: props.organizationId,
      };

      const data = await getFeedFunctions[props.feedTypeId](params);
      props.addPosts(data.data);
      setMetadata(data.metadata);
      const newPostIds = data.data.map(i => i.id);
      setPostIds(page === 1 ? newPostIds : postIds.concat(newPostIds));
    } catch (e) {
      console.error(e);
    }

    loader.done();
    setLoading(false);
  };

  const createDirectPost = async (description, mainImageFilename) => {
    loader.start();
    setLoading(true);

    try {
      const params = {
        organizationId: props.organizationId || null,
        userId: props.userId || null,
        data: {
          description,
          mainImageFilename,
          postTypeId: POST_TYPE_DIRECT_ID,
        },
      };

      const data = await createCommentPostFunctions[props.feedTypeId](params);
      props.addPosts([data]);
      setPostIds([data.id].concat(postIds));
    } catch (e) {
      console.error(e);
    }

    loader.done();
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts({ page: 1, perPage: 10 });
  }, [props.userId, props.organizationId]);

  return (
    <div className="feed">
      {props.title &&
        <div className="feed__title">
          <h1 className="title title_small">{props.title}</h1>
        </div>
      }

      <FeedInput onSubmit={createDirectPost} />

      {postIds.length > 0 &&
        <div className="feed__list">
          {postIds.map(id => (
            <div className="feed__item" key={id}>
              <Post id={id} />
            </div>
          ))}
        </div>
      }

      {metadata.hasMore &&
        <div className="feed__loadmore">
          <LoadMore
            disabled={loading}
            onClick={() => {
              if (loading) return;

              fetchPosts({
                page: metadata.page + 1,
                perPage: metadata.perPage,
              });
            }}
          />
        </div>
      }
    </div>
  );
};

Feed.propTypes = {
  feedTypeId: PropTypes.number.isRequired,
  organizationId: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
};

export default connect(
  null,
  dispatch => bindActionCreators({
    addPosts,
  }, dispatch),
)(Feed);
