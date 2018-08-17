import { connect } from 'react-redux';
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconBell from './Icons/Bell';
import IconNotification from './Icons/Notification';
import IconSearch from './Icons/Search';
import IconLogo from './Icons/Logo';
import Avatar from './Avatar';
import Popup from './Popup';
import Auth from './Auth';

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

  render() {
    return (
      <div className="header">
        <div className="header__side">
          {!this.props.user ? (
            <Fragment>
              {this.state.showAuthPopup && (
                <Popup onClickClose={() => this.closeAuthPopup()}>
                  <Auth onClickClose={() => this.closeAuthPopup()} />
                </Popup>
              )}

              <div className="inline">
                <div className="inline__item">
                  <a href="/" className="button-icon">
                    <IconLogo />
                  </a>
                </div>
                <div className="inline__item">
                  <nav className="menu menu_responsive">
                    <div className="menu__item">
                      <button className="menu__link menu__link_upper" onClick={() => this.openAuthPopup()}>Sign in</button>
                    </div>
                  </nav>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="inline">
              <div className="inline__item">
                <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
              </div>
              <div className="inline__item">
                <nav className="menu">
                  <div className="menu__item">
                    <a href="#" className="menu__link menu__link_">{this.props.user.nickname}</a>
                  </div>
                </nav>
              </div>
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
          )}
        </div>

        <div className="header__main">
          <nav className="menu menu_responsive">
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
};

export default connect(state => ({
  user: state.user,
}))(Header);
