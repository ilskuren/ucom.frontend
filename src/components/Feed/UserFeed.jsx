import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Feed from './Feed';
import { getUserById } from '../../store/users';
import { createUserCommentPost } from '../../actions/posts';

const UserFeed = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  return (
    <Feed
      postsIds={user.wallFeedIds}
      onSubmitNewPost={(description) => {
        props.createUserCommentPost({
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

UserFeed.propTypes = {
  userId: PropTypes.number,
  createUserCommentPost: PropTypes.func,
  users: PropTypes.objectOf(PropTypes.object),
};

export default connect(
  state => ({
    users: state.users,
  }),
  dispatch => bindActionCreators({
    createUserCommentPost,
  }, dispatch),
)(UserFeed);
