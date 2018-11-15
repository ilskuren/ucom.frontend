import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import Links from '../Links';
import { getUserById } from '../../store/users';

const UserSocialNetworks = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user || !user.usersSources) {
    return null;
  }

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h3 className="title title_xxsmall title_medium">Social Networks</h3>
      </div>
      <div className="user-section__content">
        <Links userSources={user.usersSources} />
      </div>
    </div>
  );
};

UserSocialNetworks.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(state => ({
  users: state.users,
}))(UserSocialNetworks);
