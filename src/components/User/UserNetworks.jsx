import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { getUserById } from '../../store/users';
import { extractHostname } from '../../utils/url';

const UserNetworks = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  if (!user.personalWebsiteUrl) {
    return null;
  }

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h3 className="title title_xxsmall title_medium">Networks</h3>
      </div>
      <div className="user-section__content">
        <a href={user.personalWebsiteUrl} target="_blank" rel="noopener noreferrer">{extractHostname(user.personalWebsiteUrl)}</a>
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
