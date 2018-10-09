import PropTypes from 'prop-types';
import React from 'react';
import Post from './Post';
// import FeedForm from './FeedForm';

const Feed = props => (
  <div className="feed">
    <div className="feed__title">
      <h1 className="title title_small">{props.title}</h1>
    </div>

    {/* <FeedForm /> */}

    {props.posts.length > 0 && (
      <div className="feed__list">
        {props.posts.map(item => (
          <div className="feed__item" key={item.id}>
            <Post id={item.id} />
          </div>
        ))}
      </div>
    )}
  </div>
);

Feed.propTypes = {
  title: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object),
};

Feed.defaultProps = {
  title: 'Ur News Feed',
};

export default Feed;
