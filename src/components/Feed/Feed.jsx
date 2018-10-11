import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Post from './Post';
import FeedInput from './FeedInput';
import { getPostById } from '../../store/posts';

const Feed = (props) => {
  const posts = props.postsIds.map(id => getPostById(props.posts, id))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="feed">
      <div className="feed__title">
        <h1 className="title title_small">{props.title}</h1>
      </div>

      <FeedInput
        onSubmit={(message) => {
          if (typeof props.onSubmit === 'function') {
            props.onSubmit(message);
          }
        }}
      />

      {posts.length > 0 && (
        <div className="feed__list">
          {posts.map(item => (
            <div className="feed__item" key={item.id}>
              <Post id={item.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Feed.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  postsIds: PropTypes.arrayOf(PropTypes.number),
  posts: PropTypes.objectOf(PropTypes.object),
};

Feed.defaultProps = {
  postsIds: [],
  title: 'Ur News Feed',
};

export default connect(state => ({
  posts: state.posts,
}))(Feed);
