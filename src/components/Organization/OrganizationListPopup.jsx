import { connect } from 'react-redux';
import React from 'react';
import { getOrganizationById } from '../../store/organizations';
import { getFileUrl } from '../../utils/upload';
import { getOrganizationUrl } from '../../utils/organization';
import OrganizationCard from './OrganizationCard';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import OrganizationFollowButton from './OrganizationFollowButton';

const OrganizationListPopup = (props) => {
  if (!props.organizationsIds || !props.organizationsIds.length) {
    return null;
  }

  const organizations = props.organizationsIds
    .sort()
    .map(id => getOrganizationById(props.organizations, id));

  return (
    <Popup>
      <ModalContent onClickClose={props.onClickClose}>
        <div className="entry-list">
          <div className="entry-list__title">Organizations</div>

          <div className="entry-list__list">
            {organizations.map(item => (
              <div className="entry-list__item" key={item.id}>
                <div className="entry-list__card">
                  <OrganizationCard
                    avatarSrc={getFileUrl(item.avatarFilename)}
                    title={item.title}
                    nickname={item.nickname}
                    currentRate={item.currentRate}
                    url={getOrganizationUrl(item.id)}
                  />
                </div>
                <div className="entry-list__follow">
                  <OrganizationFollowButton organizationId={item.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ModalContent>
    </Popup>
  );
};

export default connect(state => ({
  organizations: state.organizations,
}))(OrganizationListPopup);
