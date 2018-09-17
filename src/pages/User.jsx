import humps from 'lodash-humps';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { PureComponent, Fragment } from 'react';
import Avatar from '../components/Avatar';
import IconInfo from '../components/Icons/Info';
import Rate from '../components/Rate';
import IconLink from '../components/Icons/Link';
import IconEdit from '../components/Icons/Edit';
import Footer from '../components/Footer';
import FollowButton from '../components/FollowButton';
import Followers from '../components/Followers';
import Feed from '../components/Feed';
import Status from '../components/Status';
import { getUser } from '../api';
import { getYearsFromBirthday, getYearOfDate, userIsFollowed } from '../utils/user';
import { getFileUrl } from '../utils/upload';
import { extractHostname } from '../utils/url';

class UserPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
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

  getData(userId) {
    this.setState({ user: {} }, () => {
      getUser(userId)
        .then((user) => {
          this.setState({ user });
        });
    });
  }

  render() {
    const user = humps(this.props.user);

    return (
      <div className="content">
        <div className="content__inner">

          <div className="sheets">
            <div className="sheets__list">
              <div className="sheets__item">
                <div className="sheets__inner">10 Products</div>
              </div>
              <div className="sheets__item">
                <div className="sheets__inner">104 Events</div>
              </div>
            </div>

            <div className="sheets__content">
              <div className="user-header">
                <div className="user-header__main">
                  <Avatar size="medium" src={getFileUrl(this.state.user.avatarFilename)} />
                </div>

                <div className="user-header__side">
                  <div className="toolbar toolbar_top">
                    <div className="toolbar__main">
                      <div className="user-header__name">
                        <h1 className="title title_light">
                          <div className="inline">
                            {this.state.user.id ? (
                              <Fragment>
                                {(this.state.user.firstName || this.state.user.lastName) && (
                                  <div className="inline__item">{this.state.user.firstName} {this.state.user.lastName}</div>
                                )}
                              </Fragment>
                            ) : (
                              <div className="inline__item">
                                <span className="blank">Jon Don</span>
                              </div>
                            )}

                            {this.props.user.id && this.props.user.id === this.state.user.id && (
                              <div className="inline__item">
                                <Link className="button-icon button-icon_edit" to="/profile/general-info">
                                  <IconEdit />
                                </Link>
                              </div>
                            )}
                          </div>
                        </h1>
                      </div>

                      <div className="user-header__account-name">
                        @{this.state.user.accountName}
                      </div>

                      <div className="user-header__info">
                        {this.state.user.id ? (
                          <div className="inline">
                            <div className="inline__item">
                              Product designer
                            </div>
                            <div className="inline__item">
                              {getYearsFromBirthday(this.state.user.birthday)} y.o.
                            </div>
                          </div>
                        ) : (
                          <span className="blank">Lorem, ipsum.</span>
                        )}
                      </div>

                      {!this.state.user.id ? (
                        <div className="user-header__status">
                          <span className="blank">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, aperiam.</span>
                        </div>
                      ) : (
                        <Fragment>
                          {(this.state.user.moodMessage || this.props.user.id === this.state.user.id) && (
                            <Status
                              text={this.state.user.moodMessage || 'your status'}
                              isEditable={this.props.user.id === this.state.user.id}
                            />
                          )}
                        </Fragment>
                      )}
                    </div>
                    <div className="toolbar__side">
                      <div className="user-header__rate">
                        <Rate
                          className="rate_big"
                          value={this.state.user.currentRate}
                        />
                      </div>
                    </div>
                  </div>

                  {this.state.user.id && (
                    <div className="user-header__actions">
                      <div className="toolbar">
                        <div className="toolbar__main">
                          {this.props.user.id !== this.state.user.id && (
                            <div className="inline inline_large">
                              <div className="inline__item">
                                <FollowButton
                                  follow={this.state.user.myselfData ? this.state.user.myselfData.follow : userIsFollowed(this.state.user.followedBy, this.props.user.id)}
                                  userId={this.state.user.id}
                                />
                              </div>

                              {userIsFollowed(user.iFollow, this.state.user.id) && userIsFollowed(this.state.user.iFollow, user.id) ? (
                                <div className="inline__item">
                                  <div className="inline inline_small">
                                    <div className="inline__item">
                                      Trusted you
                                    </div>
                                    <div className="inline__item">
                                      <span className="icon">
                                        <IconInfo />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                        <div className="toolbar__side">
                          <div className="inline inline_large">
                            <div className="inline__item">
                              <Followers
                                title="Followers"
                                users={this.state.user.followedBy}
                              />
                            </div>
                            <div className="inline__item">
                              <Followers
                                title="Following"
                                users={this.state.user.iFollow}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid_user">
                <div className="grid__item">
                  {this.state.user.about && (
                    <div className="user-section">
                      <div className="user-section__title">
                        <h2 className="title title_xsmall title_light">About</h2>
                      </div>
                      <div className="user-section__text">
                        <div className="text">
                          <p>{this.state.user.about}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {this.state.user.id && (
                    <div className="user-section">
                      <div className="user-section__title">
                        <h2 className="title title_xsmall title_light">Organization</h2>
                      </div>

                      <div className="user-section__tabs">
                        <div className="menu menu_nav menu_responsive">
                          <div className="menu__item menu__item_active">
                            <button className="menu__link">My</button>
                          </div>
                          <div className="menu__item">
                            <button className="menu__link">Joined</button>
                          </div>
                          <div className="menu__item">
                            <button className="menu__link">Trusted</button>
                          </div>
                          <div className="menu__item">
                            <button className="menu__link">Followed</button>
                          </div>
                        </div>
                      </div>

                      <div className="user-section__organization">
                        <ul className="app-list">
                          {[0, 0, 0, 0, 0, 0].map((_, index) => (
                            <li key={index} className="app-list__item">
                              <div className="app-list__avatar">
                                <Avatar rounded square size="small" />
                              </div>
                              <div className="app-list__name"><span className="blank">Loremi1a</span></div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="user-section">
                    <Feed
                      title="Feed"
                      userId={this.props.match.params.id}
                    />
                  </div>
                </div>

                <div className="grid__item">
                  {this.state.user.city && (
                    <div className="user-section">
                      <div className="user-section__title">
                        <h3 className="title title_xsmall title_light">Location</h3>
                      </div>
                      <div className="user-section__content">
                        {this.state.user.city}{this.state.user.country && `, ${this.state.user.country}`}
                      </div>
                    </div>
                  )}

                  {this.state.user.firstCurrency && (
                    <div className="user-section">
                      <div className="user-section__title">
                        <h3 className="title title_xsmall title_light">In Blockchain since</h3>
                      </div>
                      <div className="user-section__content">
                        <div className="toolbar">
                          <div className="toolbar__main">
                            {this.state.user.firstCurrency}
                          </div>
                          {this.state.user.firstCurrencyYear && (
                            <div className="toolbar__side">
                              {this.state.user.firstCurrencyYear}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {(this.state.user.phoneNumber || this.state.user.email) && (
                    <div className="user-section">
                      <div className="user-section__title">
                        <h3 className="title title_xsmall title_light">Networks</h3>
                      </div>
                      <div className="user-section__content">
                        <div className="data">
                          {this.state.user.phoneNumber && (
                            <div className="data__item">
                              <div className="data__value">{this.state.user.phoneNumber}</div>
                              <div className="data__label">Phone</div>
                            </div>
                          )}
                          {this.state.user.email && (
                            <div className="data__item">
                              <div className="data__value">{this.state.user.email}</div>
                              <div className="data__label">Email</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {this.state.user.usersSources && this.state.user.usersSources.length > 0 && (
                    <div className="user-section">
                      <div className="user-section__title">
                        <h3 className="title title_xsmall title_light">Social Networks</h3>
                      </div>
                      <div className="user-section__content">
                        <ul className="links">
                          {this.state.user.usersSources.map((item, index) => (
                            <li key={index} className="links__item">
                              <span className="inline">
                                <span className="inline__item">
                                  <span className="icon">
                                    <IconLink />
                                  </span>
                                </span>
                                <span className="inline__item">
                                  <a href={item.sourceUrl} target="blank">{extractHostname(item.sourceUrl)}</a>
                                </span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {this.state.user.userJobs && this.state.user.userJobs.length > 0 && (
                    <div className="user-section">
                      <div className="user-section__title">
                        <h3 className="title title_xsmall title_light">Work Experience</h3>
                      </div>
                      <div className="user-section__content">
                        <ul className="experience">
                          {this.state.user.userJobs.map(item => (
                            <li className="experience__item" key={item.id}>
                              <div className="experience__header">
                                <div className="toolbar">
                                  <div className="toolbar__main">
                                    <div className="experience__name">{item.title}</div>
                                  </div>
                                  {item.startDate && (
                                    <div className="toolbar__side">
                                      <div className="experience__state">
                                        {getYearOfDate(item.startDate)} – {item.endDate ? getYearOfDate(item.endDate) : 'Now'}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="experience__status">{item.position}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {this.state.user.userEducations && this.state.user.userEducations.length > 0 && (
                    <div className="user-section">
                      <div className="user-section__title">
                        <h3 className="title title_xsmall title_light">Education</h3>
                      </div>
                      <div className="user-section__content">
                        <ul className="experience">
                          {this.state.user.userEducations.map(item => (
                            <li className="experience__item" key={item.id}>
                              <div className="experience__header">
                                <div className="toolbar">
                                  <div className="toolbar__main">
                                    <div className="experience__name">{item.title}</div>
                                  </div>
                                  {item.start_date && (
                                    <div className="toolbar__side">
                                      <div className="experience__state">
                                        {getYearOfDate(item.startDate)} – {item.endDate ? getYearOfDate(item.endDate) : 'Now'}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="experience__status">{item.speciality}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {this.state.user.createdAt && (
                    <div className="user-section">
                      <div className="user-section__title">
                        <h3 className="title title_xsmall title_light">Created</h3>
                      </div>
                      <div className="user-section__content">
                        {moment(this.state.user.createdAt).format('D MMM YYYY')}
                      </div>
                    </div>
                  )}

                  {this.state.user.id && (
                    <div className="user-section">
                      <button className="button button_theme_transparent button_size_medium">Share this profile</button>
                    </div>
                  )}
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

export default connect(state => ({
  user: state.user,
}))(UserPage);
