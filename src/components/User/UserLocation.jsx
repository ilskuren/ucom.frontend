import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { getUserById } from '../../store/users';

const UserLocation = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  if (!user.city) {
    return null;
  }

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h3 className="title title_xsmall title_light">Location</h3>
      </div>
      <div className="user-section__content">
        {user.city}{user.country && `, ${user.country}`}
      </div>
    </div>
  );
};

UserLocation.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(state => ({
  users: state.users,
}))(UserLocation);
