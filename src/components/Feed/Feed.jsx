import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Post from './Post';
import LoadMore from './LoadMore';
import FeedInput from './FeedInput';
import { getPostById } from '../../store/posts';

const Feed = (props) => {
  const posts = props.postsIds.map(id => getPostById(props.posts, id))
    .filter(item => !!item)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="feed">
      <div className="feed__title">
        <h1 className="title title_small">{props.title}</h1>
      </div>

      <FeedInput
        onSubmit={(message) => {
          if (typeof props.onSubmitNewPost === 'function') {
            props.onSubmitNewPost(message);
          }
        }}
      />

      {posts.length > 0 && (
        <Fragment>
          <div className="feed__list">
            {posts.map(item => (
              <div className="feed__item" key={item.id}>
                <Post id={item.id} />
              </div>
            ))}
          </div>
          {props.loadMoreIsVisible && (
            <div className="feed__loadmore">
              <LoadMore
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
  onSubmitNewPost: PropTypes.func,
  postsIds: PropTypes.arrayOf(PropTypes.number),
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
  onClickMore: PropTypes.func,
  loadMoreIsVisible: PropTypes.bool,
  feeds: PropTypes.objectOf(PropTypes.any),
};

Feed.defaultProps = {
  postsIds: [],
  title: 'Ur News Feed',
};

export default connect(state => ({
  posts: state.posts,
  feeds: state.feeds,
}))(Feed);
