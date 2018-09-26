import humps from 'lodash-humps';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { connect } from 'react-redux';
import IconLink from '../components/Icons/Link';
import Footer from '../components/Footer';
import PostHeader from '../components/PostHeader';
import VerticalCards from '../components/VerticalCards';
import OrganizationHeader from '../components/OrganizationHeader';
import { getUserName, getUserUrl } from '../utils/user';
import { getFileUrl } from '../utils/upload';
import { extractHostname } from '../utils/url';
import * as actions from '../actions';
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
    api.getOrganization(organizationId)
      .then((data) => {
        this.setState({
          organization: humps(data.data),
        });
      });
  }

  render() {
    const { organization } = this.state;

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
                  follow={
                    organization.user &&
                    organization.user.myselfData &&
                    organization.user.myselfData.follow
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
                    joined={organization.joined}
                    followers={organization.followers}
                    trustedBy={organization.trustedBy}
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

                      {/* {organization.content && (
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
                      )} */}

                      {/* {organization.events && (
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
                      )} */}

                      {/* <div className="user-section">
                        <div className="user-section__content">
                          <div className="organization__comments">
                            <Comments postId={1} comments={organization.comments} />
                          </div>
                        </div>
                      </div> */}
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

                      {organization.partners && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">Partners</h3>
                          </div>
                          <div className="user-section__content">
                            <VerticalCards userCards={organization.partners} />
                          </div>
                        </div>
                      )}

                      {organization.communities && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">Communities</h3>
                          </div>
                          <div className="user-section__content">
                            <VerticalCards userCards={organization.communities} />
                          </div>
                        </div>
                      )}

                      {organization.userSources && organization.userSources.length > 0 && (
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
                            <h3 className="title title_xsmall title_light">Created</h3>
                          </div>
                          <div className="user-section__content">
                            {moment(organization.createdAt).format('D MMM YYYY')}
                          </div>
                        </div>
                      )}

                      {/* {organization.id && (
                        <div className="user-section">
                          <button className="button button_theme_transparent button_size_medium">Share this profile</button>
                        </div>
                      )} */}
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

const mapDispatch = dispatch =>
  bindActionCreators(
    {
      setUser: actions.setUser,
    },
    dispatch,
  );

export default connect(
  state => ({
    user: selectUser(state),
  }),
  mapDispatch,
)(OrganizationPage);
