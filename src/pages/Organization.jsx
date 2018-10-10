import humps from 'lodash-humps';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { connect } from 'react-redux';
import Links from '../components/Links';
import Footer from '../components/Footer';
import PostHeader from '../components/PostHeader';
import VerticalCards from '../components/VerticalCards';
import OrganizationFeed from '../components/Feed/OrganizationFeed';
import OrganizationHeader from '../components/OrganizationHeader';
import { getUserName, getUserUrl } from '../utils/user';
import { getFileUrl } from '../utils/upload';
import { getSourceUrl } from '../utils/sources';
import * as actions from '../actions';
import { fetchOrganizationPosts } from '../actions/posts';
import { selectUser } from '../store/selectors';
import api from '../api';

class OrganizationPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      organization: {},
    };
  }

  componentDidMount() {
    this.getData(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.getData(nextProps.match.params.id);
    }
  }

  getData(organizationId) {
    this.props.fetchOrganizationPosts(organizationId);

    api.getOrganization(organizationId)
      .then((data) => {
        this.setState({
          organization: humps(data.data),
        });
      });
  }

  render() {
    const { organization } = this.state;
    const socialNetworks = (organization.socialNetworks || [])
      .filter(item => item.sourceUrl && item.sourceUrl.length > 0);

    return (
      <div className="content">
        <div className="content__inner">
          <div className="sheets">
            <div className="sheets__list">
              <div className="sheets__item">
                <PostHeader
                  theme="organization"
                  userId={organization.user && organization.user.id}
                  userUrl={getUserUrl(organization.user && organization.user.id)}
                  avatar={getFileUrl(organization.user && organization.user.avatarFilename)}
                  name={getUserName(organization.user)}
                  rating={organization.user && +organization.user.currentRate}
                  userAccountName={organization.user && organization.user.accountName}
                  follow={
                    !!organization.user &&
                    !!organization.user.id &&
                    !!(this.props.user.iFollow || []).find(item => item.id === organization.user.id)
                  }
                />
              </div>
            </div>

            <div className="sheets__content sheets__content_theme_organization">
              <div className="organization">
                <div className="organization__header">
                  <OrganizationHeader
                    editable={organization.userId === this.props.user.id}
                    avatarSrc={getFileUrl(organization.avatarFilename)}
                    title={organization.title}
                    nickname={organization.nickname}
                    poweredBy={organization.poweredBy}
                    currentRate={organization.currentRate}
                    id={organization.id}
                    accountName={this.props.user.accountName}
                    organizationBlockchainId={organization.blockchainId}
                    followers={organization.followedBy}
                    usersTeam={organization.usersTeam}
                    follow={organization.myselfData && organization.myselfData.follow}
                  />
                </div>
                <div className="organization__content">
                  <div className="grid grid_organization">
                    <div className="grid__item">
                      {organization.about && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">Mission</h3>
                          </div>
                          <div className="user-section__content">{organization.about}</div>
                        </div>
                      )}

                      <div className="user-section">
                        <OrganizationFeed organizationId={+this.props.match.params.id} />
                      </div>
                    </div>

                    <div className="grid__item">
                      {(organization.country || organization.city) && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">Location</h3>
                          </div>
                          <div className="user-section__content">
                            {organization.country && organization.city ? `${organization.country}, ${organization.city}` : (organization.country || organization.city)}
                          </div>
                        </div>
                      )}

                      {organization.partnershipSources && organization.partnershipSources.length > 0 && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">Partners</h3>
                          </div>
                          <div className="user-section__content">
                            <VerticalCards
                              title="Partners"
                              userCards={organization.partnershipSources.map(item => ({
                                id: item.id,
                                userName: item.title,
                                avatarUrl: getFileUrl(item.avatarFilename),
                                accountName: item.nickname || item.description,
                                profileLink: getSourceUrl(item),
                              }))}
                            />
                          </div>
                        </div>
                      )}

                      {organization.communitySources && organization.communitySources.length > 0 && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">Communities</h3>
                          </div>
                          <div className="user-section__content">
                            <VerticalCards
                              title="Communities"
                              userCards={organization.communitySources.map(item => ({
                                id: item.id,
                                userName: item.title,
                                avatarUrl: getFileUrl(item.avatarFilename),
                                accountName: item.nickname || item.description,
                                profileLink: getSourceUrl(item),
                              }))}
                            />
                          </div>
                        </div>
                      )}

                      {socialNetworks && socialNetworks.length > 0 && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">
                              Social Networks
                            </h3>
                          </div>
                          <div className="user-section__content">
                            <Links userSources={socialNetworks} />
                          </div>
                        </div>
                      )}

                      {organization.createdAt && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">Created</h3>
                          </div>
                          <div className="user-section__content">
                            {moment(organization.createdAt).format('D MMM YYYY')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    fetchOrganizationPosts,
    setUser: actions.setUser,
  }, dispatch),
)(OrganizationPage);
