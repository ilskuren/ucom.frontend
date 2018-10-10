import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Feed from './Feed';
import { getOrganizationPosts } from '../../store/posts';

const OrganizationFeed = props => (
  <Feed posts={getOrganizationPosts(props.posts, props.organizationId)} />
);

OrganizationFeed.propTypes = {
  organizationId: PropTypes.number,
};

export default connect(state => ({
  posts: state.posts,
}))(OrganizationFeed);
