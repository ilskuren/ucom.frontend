import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconBell from './Icons/Bell';
import IconNotification from './Icons/Notification';
import IconSearch from './Icons/Search';
import IconLogo from './Icons/Logo';
import Popup from './Popup';
import Auth from './Auth';
import UserCard from './UserCard';
import { removeToken } from '../utils/token';
import { removeUser } from '../actions';
import { getAvatarUrl } from '../utils/user';

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showAuthPopup: false,
    };
  }

  closeAuthPopup() {
    this.setState({ showAuthPopup: false });
  }

  openAuthPopup() {
    this.setState({ showAuthPopup: true });
  }

  logout() {
    removeToken();
    this.props.removeUser();
  }

  render() {
    return (
      <div className="header">
        <div className="header__side">
          {!this.props.user.id ? (
            <Fragment>
              {this.state.showAuthPopup && (
                <Popup onClickClose={() => this.closeAuthPopup()}>
                  <Auth onClickClose={() => this.closeAuthPopup()} />
                </Popup>
              )}

              <nav className="menu menu_responsive">
                <div className="menu__item">
                  <a href="/" className="menu__link">
                    <IconLogo />
                  </a>
                </div>
                <div className="menu__item">
                  <button className="menu__link menu__link_upper" onClick={() => this.openAuthPopup()}>Login</button>
                </div>
              </nav>
            </Fragment>
          ) : (
            <div className="inline inline_large">
              <div className="inline__item">
                <UserCard
                  avatarUrl={getAvatarUrl(this.props.user.avatar_filename)}
                  profileLink={`/user/${this.props.user.id}`}
                  userName={this.props.user.nickname}
                />
              </div>
              <div className="inline__item">
                <button className="button-clean button-clean_link" onClick={() => this.logout()}>
                  <strong>Logout</strong>
                </button>
              </div>
              <div className="inline__item">
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
              </div>
            </div>
          )}
        </div>

        <div className="header__main">
          <nav className="menu menu_responsive">
            {this.props.user.id && (
              <div className="menu__item">
                <Link to="/posts/new/story" className="menu__link menu__link_upper">Create Post</Link>
              </div>
            )}
            <div className="menu__item">
              <a href="#" className="menu__link menu__link_upper">Create Event</a>
            </div>
            <div className="menu__item">
              <a href="#" className="menu__link menu__link_upper">People</a>
            </div>
            <div className="menu__item">
              <a href="#" className="menu__link menu__link_upper">Organizations</a>
            </div>
            <div className="menu__item">
              <a href="#" className="menu__link menu__link_upper">Products</a>
            </div>
            <div className="menu__item">
              <a href="#" className="menu__link menu__link_upper">Events</a>
            </div>
            <div className="menu__item">
              <button className="button-icon">
                <IconSearch />
              </button>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  removeUser: PropTypes.func,
};

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    removeUser: () => dispatch(removeUser()),
  }),
)(Header);
