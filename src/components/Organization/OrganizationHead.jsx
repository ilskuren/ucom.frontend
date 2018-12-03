import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import UserFollowButton from '../User/UserFollowButton';
import UserCard from '../UserCard';
import { getUserById } from '../../store/users';
import { getUserUrl, getUserName } from '../../utils/user';
import { getFileUrl } from '../../utils/upload';
import { selectUser } from '../../store/selectors/user';
import { getOrganizationById } from '../../store/organizations';

const OrganizationHead = (props) => {
  const organization = getOrganizationById(props.organizations, props.organizationId);

  if (!organization || !organization.user || !organization.user.id) {
    return null;
  }

  const user = getUserById(props.users, organization.user.id);

  if (!user) {
    return null;
  }

  return (
    <div className="post-header">
      <div className="toolbar">
        <div className="toolbar__main">
          <UserCard
            size="big"
            userName={getUserName(user)}
            profileLink={getUserUrl(user.id)}
            avatarUrl={getFileUrl(user.avatarFilename)}
            rate={Number(user.currentRate)}
          />
        </div>
        <div className="toolbar__side">
          <div className="post-header__follow-button">
            {props.user.id && props.user.id === user.id ? null : (
              <UserFollowButton userId={user.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

OrganizationHead.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(state => ({
  users: state.users,
  organizations: state.organizations,
  user: selectUser(state),
}))(OrganizationHead);
