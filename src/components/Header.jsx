import { withRouter } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import IconLogo from './Icons/Logo';
import Avatar from './Avatar';
import MenuPopup from './MenuPopup';
import { removeToken } from '../utils/token';
import { removeUser, showAuthPopup } from '../actions';
import { getFileUrl } from '../utils/upload';
import { getUserUrl } from '../utils/user';
import { removeBrainkey } from '../utils/brainkey';

class Header extends PureComponent {
  @bind
  logout() {
    removeToken();
    removeBrainkey();
    this.props.removeUser();
  }

  render() {
    return (
      <div className="header" id="top">
        <div className="header__inner">
          <div className="header__side">
            {!this.props.user.id ? (
              <nav className="menu menu_responsive menu_header">
                <div className="menu__item">
                  <Link to="/" className="menu__link">
                    <IconLogo />
                  </Link>
                </div>
                <div className="menu__item">
                  <button className="menu__link menu__link_upper" onClick={() => this.props.showAuthPopup()}>SIGN in</button>
                </div>
              </nav>
            ) : (
              <div className="inline inline_large">
                <div className="inline__item">
                  <Link to={getUserUrl(this.props.user.id)}>
                    <Avatar src={getFileUrl(this.props.user.avatarFilename)} />
                  </Link>
                </div>

                <div className="inline__item">
                  <nav className="menu menu_responsive menu_header">
                    <div className="menu__item">
                      <button className="menu__link menu__link_upper" onClick={this.logout}>Logout</button>
                    </div>
                  </nav>
                </div>

                <div className="inline__item">
                  <nav className="menu menu_responsive menu_header">
                    <div className="menu__item">
                      <MenuPopup logout={this.logout} user={this.props.user} />
                    </div>
                  </nav>
                </div>

                {/* <div className="inline__item">
                  <div className="inline inline_small">
                    <div className="inline__item">
                      <div className="icon-counter">
                        <div className="icon-counter__icon">
                          <IconBell />
                        </div>
                        <div className="icon-counter__counter">
                          <span className="counter counter_top">1</span>
                        </div>
                      </div>
                    </div>
                    <div className="inline__item">
                      <div className="icon-counter">
                        <div className="icon-counter__icon">
                          <IconNotification />
                        </div>
                        <div className="icon-counter__counter">
                          <span className="counter counter_top">23</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            )}
          </div>

          <div className="header__main">
            <nav className="menu menu_responsive menu_header">
              {this.props.user.id && (
                <div className="menu__item">
                  <NavLink
                    to="/"
                    className="menu__link menu__link_upper"
                    activeClassName="menu__link_active"
                    isActive={() => this.props.location.pathname === '/'}
                  >
                    U.Community
                  </NavLink>
                </div>
              )}

              {this.props.user.id && (
                <div className="menu__item">
                  <NavLink
                    to="/posts/new/1"
                    className="menu__link menu__link_upper"
                    activeClassName="menu__link_active"
                    isActive={() => this.props.location.pathname === '/posts/new/1'}
                  >
                    Create Post
                  </NavLink>
                </div>
              )}

              <div className="menu__item">
                <NavLink
                  to="/posts/new/2"
                  className="menu__link menu__link_upper"
                  activeClassName="menu__link_active"
                  isActive={() => this.props.location.pathname === '/posts/new/2'}
                >
                  Create Event
                </NavLink>
              </div>
              <div className="menu__item">
                <NavLink
                  to="/users"
                  className="menu__link menu__link_upper"
                  activeClassName="menu__link_active"
                  isActive={() => this.props.location.pathname === '/users'}
                >
                  People
                </NavLink>
              </div>
              <div className="menu__item">
                <NavLink
                  to="/organizations"
                  className="menu__link menu__link_upper"
                  activeClassName="menu__link_active"
                  isActive={() => this.props.location.pathname === '/organizations'}
                >
                  Organizations
                </NavLink>
              </div>
              <div className="menu__item">
                <NavLink
                  to="/products"
                  className="menu__link menu__link_upper"
                  activeClassName="menu__link_active"
                  isActive={() => this.props.location.pathname === '/products'}
                >
                  Products
                </NavLink>
              </div>
              <div className="menu__item">
                <NavLink
                  to="/events/media"
                  className="menu__link menu__link_upper"
                  activeClassName="menu__link_active"
                  isActive={() => this.props.location.pathname.indexOf('/events') === 0}
                >
                  Events
                </NavLink>
              </div>
              {/* <div className="menu__item">
                <button className="button-icon">
                  <IconSearch />
                </button>
              </div> */}
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  removeUser: PropTypes.func,
  showAuthPopup: PropTypes.func,
};

export default withRouter(connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    removeUser: () => dispatch(removeUser()),
    showAuthPopup: () => dispatch(showAuthPopup()),
  }),
)(Header));
