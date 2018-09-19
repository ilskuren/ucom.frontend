import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Route, Redirect } from 'react-router';

import MyProfileFollowersPage from './MyProfile/Followers';
import MyProfileFeedPage from './MyProfile/Feed';
import MyProfileOrganizationsPage from './MyProfile/Organizations';
import MyProfileProductsPage from './MyProfile/Products';
import MyProfileEventsPage from './MyProfile/Events';

import Footer from '../components/Footer';
import FollowersAmount from '../components/FollowersAmount';
import ProfileHeader from '../components/ProfileHeader';

import * as actions from '../actions';

class MyProfilePage extends PureComponent {
  componentDidMount() {

  }

  render() {
    return this.props.user.id ? (
      <Fragment>
        <div className="my-profile">
          <div className="content content_separated">
            <div className="my-profile__header">
              <ProfileHeader
                name="James Franco"
                nickname="kames_franko"
                status={this.props.user.moodMessage}
                setUser={this.props.setUser}
                userRatePosition={123}
                userRate="12 293"
              />
            </div>
            <div className="my-profile__statistics-menu">
              <div className="toolbar">
                <div className="toolbar__main">
                  <div className="menu menu_simple-tabs menu_simple-tabs_medium menu_simple-tabs_black">
                    <div className="menu__item">
                      <NavLink
                        className="menu__link"
                        activeClassName="menu__link_active"
                        to="/my-profile/feed"
                        isActive={() => this.props.location.pathname === '/my-profile/feed'}
                      >
                        <div className="rate rate_small">
                          <div className="rate__value">101</div>
                          <div className="rate__label">feed</div>
                        </div>
                      </NavLink>
                    </div>
                    <div className="menu__item">
                      <NavLink
                        className="menu__link"
                        activeClassName="menu__link_active"
                        to="/my-profile/organizations"
                        isActive={() => this.props.location.pathname === '/my-profile/organizations'}
                      >
                        <div className="rate rate_small">
                          <div className="rate__value">5</div>
                          <div className="rate__label">organizations</div>
                        </div>
                      </NavLink>
                    </div>
                    <div className="menu__item">
                      <NavLink
                        className="menu__link"
                        activeClassName="menu__link_active"
                        to="/my-profile/products"
                        isActive={() => this.props.location.pathname === '/my-profile/products'}
                      >
                        <div className="rate rate_small">
                          <div className="rate__value">10</div>
                          <div className="rate__label">products</div>
                        </div>
                      </NavLink>
                    </div>
                    <div className="menu__item">
                      <NavLink
                        className="menu__link"
                        activeClassName="menu__link_active"
                        to="/my-profile/events"
                        isActive={() => this.props.location.pathname === '/my-profile/events'}
                      >
                        <div className="rate rate_small">
                          <div className="rate__value">4</div>
                          <div className="rate__label">events</div>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="toolbar">
                <div className="toolbar__main">
                  <div className="menu menu_simple-tabs menu_simple-tabs_black menu_simple-tabs_medium">
                    <div className="menu__item">
                      <NavLink
                        className="menu__link"
                        activeClassName="menu__link_active"
                        to="/my-profile/followers/followers"
                        isActive={() => this.props.location.pathname === '/my-profile/followers/followers'}
                      >
                        <FollowersAmount status="followers" />
                      </NavLink>
                    </div>
                    <div className="menu__item">
                      <NavLink
                        className="menu__link"
                        activeClassName="menu__link_active"
                        to="/my-profile/followers/following"
                        isActive={() => this.props.location.pathname === '/my-profile/followers/following'}
                      >
                        <FollowersAmount status="following" />
                      </NavLink>
                    </div>
                    <div className="menu__item">
                      <NavLink
                        className="menu__link"
                        activeClassName="menu__link_active"
                        to="/my-profile/followers/trusted-by"
                        isActive={() => this.props.location.pathname === '/my-profile/followers/trusted-by'}
                      >
                        <FollowersAmount status="trusted by" />
                      </NavLink>
                    </div>
                    <div className="menu__item">
                      <NavLink
                        className="menu__link"
                        activeClassName="menu__link_active"
                        to="/my-profile/followers/joined"
                        isActive={() => this.props.location.pathname === '/my-profile/followers/joined'}
                      >
                        <FollowersAmount status="joined" />
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="content__inner">
            <Fragment>
              <Route exact path="/my-profile/followers/*" component={MyProfileFollowersPage} />
              <Route exact path="/my-profile/feed" component={MyProfileFeedPage} />
              <Route exact path="/my-profile/organizations" component={MyProfileOrganizationsPage} />
              <Route exact path="/my-profile/products" component={MyProfileProductsPage} />
              <Route exact path="/my-profile/events" component={MyProfileEventsPage} />
            </Fragment>
            <Footer />
          </div>
        </div>
      </Fragment>
    ) : (
      <Redirect to="/" />
    );
  }
}

MyProfilePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  setUser: PropTypes.func,
};

const mapDispatch = dispatch =>
  bindActionCreators({
    setUser: actions.setUser,
  }, dispatch);

export default connect(state => ({
  user: state.user,
}), mapDispatch)(MyProfilePage);
