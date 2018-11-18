import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { getUserById } from '../../store/users';

const UserCreatedAt = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  if (!user.createdAt) {
    return null;
  }

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h3 className="title title_xxsmall title_medium">Created</h3>
      </div>
      <div className="user-section__content">
        {moment(user.createdAt).format('D MMM YYYY')}
      </div>
    </div>
  );
};

UserCreatedAt.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(state => ({
  users: state.users,
}))(UserCreatedAt);
