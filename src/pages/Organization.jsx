import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { connect } from 'react-redux';
import Avatar from '../components/Avatar';
import IconLink from '../components/Icons/Link';
import Footer from '../components/Footer';
import Followers from '../components/Followers';
import Comments from '../components/Comments';
import PostHeader from '../components/PostHeader';
import VerticalCards from '../components/VerticalCards';
import ProfileHeader from '../components/ProfileHeader';
import FollowButton from '../components/FollowButton';
import { getUserName, getUserUrl } from '../utils/user';
import { getFileUrl } from '../utils/upload';
import { extractHostname } from '../utils/url';
import * as actions from '../actions';

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
    this.setState({ organization: {} }, () => {
      import('../mocks/organization')
        .then((importedOrganizationsData) => {
          const organization = importedOrganizationsData.default.filter(org => org.id === organizationId);
          if (organization.length === 1) {
            this.setState({ organization: organization[0] });
          } else {
            throw new Error(`Can not get organization by id: ${organizationId}`);
          }
        })
        .catch(err => console.error(err.message));
    });
  }

  render() {
    const { organization } = this.state;
    return (
      <div className="content content_separated">
        <div className="content__inner">
          <div className="sheets">
            <div className="sheets__list">
              <div className="sheets__item">
                <PostHeader
                  userId={organization.owner && organization.owner.id}
                  userUrl={getUserUrl(organization.owner && organization.owner.id)}
                  avatar={getFileUrl(organization.owner && organization.owner.avatarFilename)}
                  name={getUserName(organization.owner)}
                  rating={organization.owner && organization.owner.currentRate}
                  follow={
                    organization.owner &&
                    organization.owner.myselfData &&
                    organization.owner.myselfData.follow
                  }
                  theme="organization"
                />
              </div>
            </div>
            <div className="sheets__content sheets__content_theme_organization">
              <div className="organization">
                <div className="organization__header">
                  <ProfileHeader
                    name={organization.name}
                    nickname={organization.nickname}
                    status={organization.status}
                    setUser={this.props.setUser}
                    userRatePosition={organization.ratePosition}
                    userRate={organization.rate}
                    users={organization.users}
                    poweredBy={organization.poweredBy}
                    statusTheme="organization"
                    squareAvatar
                    isBoldTextInStatus
                  />

                  {organization.followData && (
                    <div className="organization__menu">
                      <div className="toolbar toolbar_responsive">
                        <div className="toolbar__main">
                          <div className="organization__follow-button">
                            <FollowButton
                              follow={organization.followData.followOrganization}
                              userId={organization.followData.followUserId}
                              isStretched
                            />
                          </div>
                        </div>
                        <div className="toolbar__side">
                          <div className="menu menu_simple-tabs menu_simple-tabs_black menu_simple-tabs_medium">
                            <div className="menu__item">
                              <Followers
                                title="Joined"
                                users={organization.followData.joined}
                              />
                            </div>
                            <div className="menu__item">
                              <Followers
                                title="Followers"
                                users={organization.followData.followers}
                              />
                            </div>
                            <div className="menu__item">
                              <Followers
                                title="Trusted by"
                                users={organization.followData.trustedBy}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="organization__content">
                <div className="grid grid_organization">
                  <div className="grid__item">
                    {organization.content && (
                      <Fragment>
                        <div className="user-section">
                          <div className="user-section__content">
                            <img
                              src={organization.content.media}
                              alt="vitalik"
                              className="organization__media"
                            />
                          </div>
                        </div>

                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">
                              Mission
                            </h3>
                          </div>
                          <div className="user-section__content">
                            <div className="organization__text">
                              {organization.content.text}
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    )}

                    {organization.events && (
                      <div className="user-section">
                        <div className="user-section__tabs">
                          <div className="menu menu_nav menu_responsive">
                            <div className="menu__item">
                              <button className="menu__link menu__item_active">
                                Events
                              </button>
                            </div>
                            <div className="menu__item">
                              <button className="menu__link">Products</button>
                            </div>
                          </div>
                        </div>

                        <div className="user-section__organization">
                          <ul className="app-list">
                            {organization.events.map((event, index) => (
                              <li key={index} className="app-list__item">
                                <div className="app-list__avatar">
                                  <Avatar square size="small" src={event.src} />
                                </div>
                                <div className="app-list__name">
                                  {event.name}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    <div className="user-section">
                      <div className="user-section__content">
                        <div className="organization__comments">
                          <Comments postId={1} comments={organization.comments} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid__item">
                    {organization.location && (
                      <div className="user-section">
                        <div className="user-section__title">
                          <h3 className="title title_xsmall title_light">
                            Location
                          </h3>
                        </div>
                        <div className="user-section__content">
                          <div className="inline">
                            <div className="inline__item">
                              {organization.location.city}{organization.location.country && `, ${organization.location.country}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {organization.partners && (
                      <div className="user-section">
                        <div className="user-section__title">
                          <h3 className="title title_xsmall title_light">
                            Partners
                          </h3>
                        </div>
                        <div className="user-section__content">
                          <VerticalCards userCards={organization.partners} />
                        </div>
                      </div>
                    )}

                    {organization.communities && (
                      <div className="user-section">
                        <div className="user-section__title">
                          <h3 className="title title_xsmall title_light">
                            Communities
                          </h3>
                        </div>
                        <div className="user-section__content">
                          <VerticalCards userCards={organization.communities} />
                        </div>
                      </div>
                    )}

                    {organization.userSources &&
                      organization.userSources.length > 0 && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">
                              Social Networks
                            </h3>
                          </div>
                          <div className="user-section__content">
                            <ul className="links">
                              {organization.userSources.map((item, index) => (
                                <li key={index} className="links__item">
                                  <span className="inline">
                                    <span className="inline__item">
                                      <span className="icon">
                                        <IconLink />
                                      </span>
                                    </span>
                                    <span className="inline__item">
                                      <a href={item.sourceUrl} target="blank">
                                        {extractHostname(item.sourceUrl)}
                                      </a>
                                    </span>
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                    {organization.createdAt && (
                      <div className="user-section">
                        <div className="user-section__title">
                          <h3 className="title title_xsmall title_light">
                            Created
                          </h3>
                        </div>
                        <div className="user-section__content">
                          {moment(organization.createdAt).format('D MMM YYYY')}
                        </div>
                      </div>
                    )}

                    {organization.id && (
                      <div className="user-section">
                        <button className="button button_theme_transparent button_size_medium">
                          Share this profile
                        </button>
                      </div>
                    )}
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

const mapDispatch = dispatch =>
  bindActionCreators(
    {
      setUser: actions.setUser,
    },
    dispatch,
  );

export default connect(
  state => ({
    user: state.user,
  }),
  mapDispatch,
)(OrganizationPage);
