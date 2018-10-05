import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Feed from './Feed';

const UserFeed = (props) => {
  const posts = Object.entries(props.posts.data)
    .map(item => item[1])
    .filter(item => item.userId === props.userId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return <Feed posts={posts} />;
};

UserFeed.propTypes = {
  userId: PropTypes.number,
};

export default connect(state => ({
  posts: state.posts,
}))(UserFeed);
