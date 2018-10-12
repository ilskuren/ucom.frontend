import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { getUserById } from '../../store/users';

const UserNetworks = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  if (!user.phoneNumber && !user.email) {
    return null;
  }

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h3 className="title title_xsmall title_light">Networks</h3>
      </div>
      <div className="user-section__content">
        <div className="data">
          {user.phoneNumber && (
            <div className="data__item">
              <div className="data__value">{user.phoneNumber}</div>
              <div className="data__label">Phone</div>
            </div>
          )}
          {user.email && (
            <div className="data__item">
              <div className="data__value">{user.email}</div>
              <div className="data__label">Email</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

UserNetworks.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(state => ({
  users: state.users,
}))(UserNetworks);
