import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Feed from './Feed';
import { getPostsByUserId } from '../../store/posts';

const UserFeed = props => (
  <Feed posts={getPostsByUserId(props.posts, props.userId)} />
);

UserFeed.propTypes = {
  userId: PropTypes.number,
};

export default connect(state => ({
  posts: state.posts,
}))(UserFeed);
