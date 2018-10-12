import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { getUserById } from '../../store/users';

const UserAbout = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  if (!user.about) {
    return null;
  }

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h2 className="title title_xsmall title_light">About</h2>
      </div>

      <div className="user-section__text">
        <div className="text">
          <p>{user.about}</p>
        </div>
      </div>
    </div>
  );
};

UserAbout.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(state => ({
  users: state.users,
}))(UserAbout);
