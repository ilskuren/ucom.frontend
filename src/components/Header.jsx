import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MiniIconLogo from './Icons/MiniLogo';
import IconLogo from './Icons/Logo';
import Avatar from './Avatar';
import MenuPopup from './MenuPopup';
import { removeToken } from '../utils/token';
import { removeUser, showAuthPopup } from '../actions';
import { getFileUrl } from '../utils/upload';
import { removeBrainkey } from '../utils/brainkey';
import { selectUser } from '../store/selectors';
import Popup from './Popup';
import ModalContent from './ModalContent';
import CreateEventPopup from './CreateEventPopup';
import NotificationTrigger from './NotificationCards/NotificationTrigger';

class Header extends PureComponent {
  state = {
    createPopupIsVisible: false,
  }

  logout = () => {
    removeToken();
    removeBrainkey();
    this.props.removeUser();
    window.location.reload();
  }

  hideCreatePopup = () => {
    this.setState({ createPopupIsVisible: false });
  }

  showCreatePopup = () => {
    this.setState({ createPopupIsVisible: true });
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
                <div className="menu__item">
                  <div className="menu-popup">
                    <div className="menu-popup__arrow-wrapper" role="presentation" onClick={this.props.triggerMenuPopup}>
                      <div className="menu-popup__arrow" />
                    </div>
                  </div>
                </div>
              </nav>
            ) : (
              <div className="inline">
                <div className="inline__item mini-icon-logo">
                  <Link to="/" className="menu__link">
                    <MiniIconLogo />
                  </Link>
                </div>
                <div className="inline__item">
                  <Link to={`/user/${this.props.user.id}`}>
                    <Avatar src={getFileUrl(this.props.user.avatarFilename)} />
                  </Link>
                </div>
                <div className="inline__item">
                  <div className="header__rate">{(+this.props.user.currentRate).toLocaleString()}°</div>
                </div>
                <div className="inline__item">
                  <nav className="menu menu_responsive menu_header">
                    <div className="menu__item">
                      {/* <MenuPopup logout={this.logout} user={this.props.user} /> */}
                      <div className="menu-popup">
                        <div className="menu-popup__arrow-wrapper" role="presentation" onClick={this.props.triggerMenuPopup}>
                          <div className="menu-popup__arrow" />
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>

                <div className="inline__item bell__container">
                  <NotificationTrigger />
                </div>
              </div>
            )}
          </div>

          <div className="header__main">
            <nav className="menu menu_responsive menu_header">


              {/* {this.props.user.id && (
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
              </div> */}
              <div className="menu__item menu__item_only_desktop">
                {/* <button onClick={this.showCreatePopup} className="menu__link-button"><strong> Add publication</strong></button> */}

                <Link to="/posts/new/1" className="menu__link-button">
                  <strong>Add publication</strong>
                </Link>
              </div>

              <div className="menu__item menu__item_only_phone">
                <NavLink
                  to="/posts/new/1"
                  className="menu__link menu__link_upper"
                  activeClassName="menu__link_active"
                  isActive={() => this.props.location.pathname === '/posts/new/1'}
                >
                  Add&nbsp;publication
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
                  to="/communities"
                  className="menu__link menu__link_upper"
                  activeClassName="menu__link_active"
                  isActive={() => this.props.location.pathname === '/communities'}
                >
                  Communities
                </NavLink>
              </div>
              <div className="menu__item">
                <NavLink
                  to="/publications/media"
                  className="menu__link menu__link_upper"
                  activeClassName="menu__link_active"
                  isActive={() => this.props.location.pathname.indexOf('/publications') === 0}
                >
                  Publications
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
        {this.state.createPopupIsVisible && (
          <Popup onClickClose={() => this.hideCreatePopup()}>
            <ModalContent onClickClose={() => this.hideCreatePopup()}>
              <CreateEventPopup onClickClose={() => this.hideCreatePopup()} />
            </ModalContent>
          </Popup>
        )}
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
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    removeUser,
    showAuthPopup,
  }, dispatch),
)(Header));
