import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { getUserById } from '../../store/users';
import OrganizationList from '../Organization/OrganizationList';

const ORGANIZATION_LIMIT = 4;

const UserOrganizations = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user || !user.organizations || !user.organizations.length) {
    return null;
  }
  console.log(user);

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h2 className="title title_xxsmall title_medium">
          Organizations&nbsp;
          {user.organizations.length > ORGANIZATION_LIMIT && <em>{user.organizations.length}</em>}
        </h2>
      </div>

      <OrganizationList
        limit={ORGANIZATION_LIMIT}
        organizationsIds={user.organizations.map(item => item.id)}
      />
    </div>
  );
};

UserOrganizations.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(state => ({
  users: state.users,
}))(UserOrganizations);
