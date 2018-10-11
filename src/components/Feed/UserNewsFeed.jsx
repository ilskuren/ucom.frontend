import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Feed from './Feed';
import { getUserById } from '../../store/users';
import { createSelfCommentPost } from '../../actions/posts';

const UserNewsFeed = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  return (
    <Feed
      postsIds={user.newsFeedIds}
      onSubmit={(description) => {
        props.createSelfCommentPost({
          userId: props.userId,
          data: {
            description,
            post_type_id: 10,
          },
        });
      }}
    />
  );
};

UserNewsFeed.propTypes = {
  userId: PropTypes.number,
  createSelfCommentPost: PropTypes.func,
  users: PropTypes.objectOf(PropTypes.object),
};

export default connect(
  state => ({
    users: state.users,
  }),
  dispatch => bindActionCreators({
    createSelfCommentPost,
  }, dispatch),
)(UserNewsFeed);
