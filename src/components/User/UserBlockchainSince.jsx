import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { getUserById } from '../../store/users';

const UserBlockchainSince = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  if (!user.firstCurrency) {
    return null;
  }

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h3 className="title title_xsmall title_light">In Blockchain since</h3>
      </div>
      <div className="user-section__content">
        <div className="toolbar">
          <div className="toolbar__main">
            {user.firstCurrency}
          </div>
          {user.firstCurrencyYear && (
            <div className="toolbar__side">
              {user.firstCurrencyYear}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

UserBlockchainSince.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(state => ({
  users: state.users,
}))(UserBlockchainSince);
