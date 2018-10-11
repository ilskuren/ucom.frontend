import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { connect } from 'react-redux';
import Links from '../components/Links';
import Footer from '../components/Footer';
import UserFeed from '../components/Feed/UserFeed';
import UserHead from '../components/User/UserHead';
import UserOrganizations from '../components/User/UserOrganizations';
import UserAbout from '../components/User/UserAbout';
import api from '../api';
import { selectUser } from '../store/selectors/user';
import { getYearOfDate } from '../utils/user';
import * as actions from '../actions';
import { fetchUser } from '../actions/users';
import { fetchUserPosts, getUserWallFeed } from '../actions/posts';

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
    this.props.fetchUser(userId);
    this.props.getUserWallFeed(userId);

    this.setState({ user: {} }, () => {
      api.getUser(userId)
        .then((user) => {
          this.setState({ user });
        });
    });
  }

  render() {
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
              <UserHead userId={this.props.match.params.id} />

              <div className="grid grid_user">
                <div className="grid__item">
                  <UserAbout userId={+this.props.match.params.id} />
                  <UserOrganizations userId={+this.props.match.params.id} />
                  <UserFeed userId={+this.props.match.params.id} />
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
                        <Links userSources={this.state.user.usersSources} />
                      </div>
                    </div>
                  )}

                  {this.state.user.usersJobs && this.state.user.usersJobs.length > 0 && (
                    <div className="user-section">
                      <div className="user-section__title">
                        <h3 className="title title_xsmall title_light">Work Experience</h3>
                      </div>
                      <div className="user-section__content">
                        <ul className="experience">
                          {this.state.user.usersJobs.map(item => (
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

                  {this.state.user.usersEducation && this.state.user.usersEducation.length > 0 && (
                    <div className="user-section">
                      <div className="user-section__title">
                        <h3 className="title title_xsmall title_light">Education</h3>
                      </div>
                      <div className="user-section__content">
                        <ul className="experience">
                          {this.state.user.usersEducation.map(item => (
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
    fetchUser,
    fetchUserPosts,
    getUserWallFeed,
    setUser: actions.setUser,
  }, dispatch),
)(UserPage);
