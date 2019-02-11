import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import AvatarFromFile from '../AvatarFromFile';
import CommunityIcon from '../Icons/Community';
import { getFileUrl } from '../../utils/upload';
import { getOrganizationUrl } from '../../utils/organization';
import { getOrganization } from '../../actions/organizations';


const CommunityCard = (props) => {
  const organization = props.community;

  const profileLink = getOrganizationUrl(organization.id);
  const avatarUrl = getFileUrl(organization.avatarFilename);

  const avatar = avatarUrl && typeof avatarUrl === 'object' ?
    <AvatarFromFile rounded file={avatarUrl} size="medium" /> :
    <Avatar BlankIcon={CommunityIcon} rounded src={avatarUrl} size="medium" />;

  return (
    <div className="community-item">
      <div className="community-item__header">
        <Link target="_blank" to={profileLink} href={profileLink} className="community-item__avatar">{avatar}</Link>
        <div className="community-item__content">
          <div className="community-item__toobar">
            <div className="community-item__main">
              <Link target="_blank" to={profileLink} href={profileLink} className="community-item__title">{organization.title}</Link>
              {organization.poweredBy &&
              <div className="community-item__powered">
                Powered by {organization.poweredBy}
              </div>
              }
            </div>
            <div className="community-item__rate">
              {organization.currentRate}°
            </div>
          </div>
          <div className="community-item__about">
            {organization.about}
          </div>
        </div>
      </div>

      {/* <div className="community-item__footer">
        {organization.followedBy &&
        <div className="community-item__folowers">
          {organization.followedBy.length ?
            <div className="community-item__user-avatars">{
              organization.followedBy.slice(0, 3)
              .map((item, i) => (
                <div className="community-item__user-avatar" key={i}>
                  <Avatar src={getFileUrl(item.avatarFilename)} size="xmsmall" />
                </div>))}
            </div> : null
          }

          {organization.followedBy.length}
          <div className="community-item__caption">
              Followers
          </div>
        </div>}

        <div className="community-item__posts">567
          <div className="community-item__caption">
            Posts
          </div>
        </div>
      </div> */}
    </div>
  );
};


export default connect(state => ({
  organizations: state.organizations,
}), dispatch => bindActionCreators({
  getOrganization,
}, dispatch))(CommunityCard);
