// import { sortBy } from 'lodash';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
// import Avatar from '../Avatar';
import { getUserById } from '../../store/users';
// import { getOrganizationUrl } from '../../utils/organization';
// import { getFileUrl } from '../../utils/upload';
// import UserCard from '../UserCard';
import OrganizationList from '../Organization/OrganizationList';

const UserOrganizations = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user || !user.organizations || !user.organizations.length) {
    return null;
  }

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h2 className="title title_xxsmall title_medium">
          Organizations <em>{user.organizations.length}</em>
        </h2>
      </div>

      <OrganizationList
        organizationsIds={user.organizations.map(item => item.id)}
      />

      {/* <div className="user-section__organization">
        <ul className="app-list">
          {sortBy(user.organizations, item => item.id).map(item => (
            <li key={item.id} className="app-list__item">
              <div className="app-list__avatar">
                <Link to={getOrganizationUrl(item.id)}>
                  <Avatar src={getFileUrl(item.avatarFilename)} size="small" rounded square />
                </Link>
              </div>
              <div className="app-list__name">
                <Link to={getOrganizationUrl(item.id)}>{item.title}</Link>
              </div>
            </li>
          ))}
        </ul>
      </div> */}
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
