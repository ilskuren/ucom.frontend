import { uniq } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Post from './Post/Post';
import LoadMore from './LoadMore';
import FeedInput from './FeedInput';
import { getPostById } from '../../store/posts';
import { fetchPost, createUserCommentPost, createSelfCommentPost, createOrganizationsCommentPost } from '../../actions/posts';
import { USER_NEWS_FEED_ID, USER_WALL_FEED_ID, ORG_FEED_ID } from '../../utils/feed';

const Feed = (props) => {
  const posts = uniq(props.postsIds)
    .map(id => getPostById(props.posts, id))
    .filter(item => !!item)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const createDirectPost = (description, main_image_filename) => {
    let fn;

    switch (props.typeFeed) {
      case (USER_NEWS_FEED_ID):
        fn = props.createUserCommentPost;
        break;
      case (USER_WALL_FEED_ID):
        fn = props.createSelfCommentPost;
        break;
      case (ORG_FEED_ID):
        fn = props.createOrganizationsCommentPost;
        break;
      default:
        break;
    }
    fn({
      organizationId: props.organizationId ? props.organizationId : null,
      userId: props.userId,
      data: {
        post_type_id: 10,
        description,
        main_image_filename,
      },
    });
  };

  return (
    <div className="feed">
      {props.title &&
        <div className="feed__title">
          <h1 className="title title_small">{props.title}</h1>
        </div>
      }

      <FeedInput
        onSubmit={createDirectPost}
      />

      {posts.length > 0 && (
        <Fragment>
          <div className="feed__list">
            {posts.map(item => (
              <div className="feed__item" key={item.id}>
                <Post
                  id={item.id}
                  postTypeId={item.postTypeId}
                />
              </div>
            ))}
          </div>
          {props.loadMoreIsVisible && (
            <div className="feed__loadmore">
              <LoadMore
                disabled={props.feeds.loading}
                onClick={() => {
                  if (!props.feeds.loading && typeof props.onClickMore === 'function') {
                    props.onClickMore();
                  }
                }}
              />
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

Feed.propTypes = {
  title: PropTypes.string,
  createUserCommentPost: PropTypes.func,
  postsIds: PropTypes.arrayOf(PropTypes.number),
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
  onClickMore: PropTypes.func,
  loadMoreIsVisible: PropTypes.bool,
  feeds: PropTypes.objectOf(PropTypes.any),
};

Feed.defaultProps = {
  postsIds: [],
};

export default connect(
  state => ({
    posts: state.posts,
    feeds: state.feeds,
  }),
  dispatch => bindActionCreators({
    fetchPost,
    createUserCommentPost,
    createSelfCommentPost,
    createOrganizationsCommentPost,
  }, dispatch),
)(Feed);
