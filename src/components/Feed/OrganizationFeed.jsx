import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Feed from './Feed';
import { getOrganizationById } from '../../store/organizations';
import { createOrganizationsCommentPost } from '../../actions/organizations';

const OrganizationFeed = (props) => {
  const organization = getOrganizationById(props.organizations, props.organizationId);

  if (!organization) {
    return null;
  }

  return (
    <Feed
      postsIds={organization.wallFeedIds}
      onSubmitNewPost={(description) => {
        props.createOrganizationsCommentPost({
          organizationId: props.organizationId,
          data: {
            description,
            post_type_id: 10,
          },
        });
      }}
    />
  );
};

OrganizationFeed.propTypes = {
  organizationId: PropTypes.number,
  createOrganizationsCommentPost: PropTypes.func,
};

export default connect(
  state => ({
    posts: state.posts,
    organizations: state.organizations,
  }),
  dispatch => bindActionCreators({
    createOrganizationsCommentPost,
  }, dispatch),
)(OrganizationFeed);
