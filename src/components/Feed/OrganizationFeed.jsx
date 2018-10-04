import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Feed from './Feed';

const OrganizationFeed = (props) => {
  const posts = Object.entries(props.posts.data)
    .map(item => item[1])
    .filter(item => item.organizationId === props.organizationId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return <Feed posts={posts} />;
};

OrganizationFeed.propTypes = {
  organizationId: PropTypes.number,
};

export default connect(state => ({
  posts: state.posts,
}))(OrganizationFeed);
