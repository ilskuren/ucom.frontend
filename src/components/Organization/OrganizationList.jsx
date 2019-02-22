import { connect } from 'react-redux';
import React, { PureComponent, Fragment } from 'react';
import { getOrganizationById } from '../../store/organizations';
import { getFileUrl } from '../../utils/upload';
import OrganizationCard from './OrganizationCard';
import { getOrganizationUrl } from '../../utils/organization';
import OrganizationListPopup from './OrganizationListPopup';
import OrganizationListPopupMore from './OrganizationListPopupMore';

class OrganizationList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      popupVisible: false,
    };
  }

  render() {
    const {
      organizationsIds, myOrganizations, limit, organizations, tagTitle, loadMore,
    } = this.props;
    if ((!organizationsIds || !organizationsIds.length) && (!myOrganizations || !myOrganizations.length)) {
      return null;
    }

    const visibleOrganizations = myOrganizations ? myOrganizations.slice(0, limit) :
      organizationsIds
        .sort()
        .slice(0, limit)
        .map(id => getOrganizationById(organizations, id))
        .filter(item => item && item.id);

    const allOrganizations = myOrganizations || organizationsIds;

    return (
      <Fragment>
        <div className="organization-list">
          <div className="organization-list__list">
            {visibleOrganizations.map(item => (
              <div className="organization-list__item" key={item.id}>
                <OrganizationCard
                  avatarSrc={getFileUrl(item.avatarFilename)}
                  title={item.title}
                  nickname={item.nickname}
                  currentRate={item.currentRate}
                  url={getOrganizationUrl(item.id)}
                />
              </div>
            ))}
          </div>

          {allOrganizations.length > limit &&
            <div className="organization-list__more">
              <button
                className="button-clean button-clean_link"
                onClick={() => { this.setState({ popupVisible: true }); loadMore(); }}
              >
                View All
              </button>
            </div>
          }

        </div>
        {this.state.popupVisible && myOrganizations &&
          <OrganizationListPopup
            myOrganizations={myOrganizations}
            onClickClose={() => this.setState({ popupVisible: false })}
          />
        }

        {this.state.popupVisible && organizationsIds && (
          tagTitle ? (
            <OrganizationListPopupMore
              organizationsIds={organizationsIds}
              tagTitle={tagTitle}
              onClickClose={() => this.setState({ popupVisible: false })}
            />
          ) : (
            <OrganizationListPopup
              organizationsIds={organizationsIds}
              onClickClose={() => this.setState({ popupVisible: false })}
            />
          )
        )}
      </Fragment>
    );
  }
}

export default connect(state => ({
  organizations: state.organizations,
}))(OrganizationList);
