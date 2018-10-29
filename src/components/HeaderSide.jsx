import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Avatar from './Avatar';
import IconLogo from './Icons/Logo';
import MiniIconLogo from './Icons/MiniLogo';
import { getFileUrl } from '../utils/upload';
import NotificationTrigger from './NotificationCards/NotificationTrigger';
import { showAuthPopup } from '../actions';
import { triggerMenuPopup, hideMenuPopup } from '../actions/menuPopup';
import { selectUser } from '../store/selectors';

/* {menuPopupVisibility ?
      <div className="inline inline__group">
        {this.props.user.id ?
          <Fragment>
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
          </Fragment>
          :
          <Fragment>
            <div className="inline__item only-phone">
              <Link to="/" className="menu__link">
                <IconLogo />
              </Link>
            </div>
            <div className="menu__item">
              <button className="menu__link menu__link_upper" onClick={() => this.props.showAuthPopup()}>SIGN in</button>
            </div>
          </Fragment>
        }
        <div className="inline__item menu-popup__item-arrow" role="presentation" onClick={this.hidePopup} >
          <div className="menu-popup__arrow menu-popup__arrow_red" role="presentation" />
        </div>
      </div> : */
const HeaderSide = ({
  user, showAuthPopup, triggerMenuPopup, menuPopupVisibility,
}) => (
  <div className="header__side">
    {!user.id ? (
      <nav className="menu menu_responsive menu_header">
        <div className="menu__item">
          <Link to="/" className="menu__link">
            <IconLogo />
          </Link>
        </div>
        <div className="menu__item left">
          <button className="menu__link menu__link_upper " onClick={() => showAuthPopup()}>SIGN in</button>
        </div>
        <div className="menu__item only-phone">
          <div className="menu-popup">
            <div className="menu-popup__arrow-wrapper" role="presentation" onClick={triggerMenuPopup}>
              <div className={`menu-popup__arrow ${menuPopupVisibility ? 'menu-popup__arrow_red' : ''}`} />
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
          <Link to={`/user/${user.id}`}>
            <Avatar src={getFileUrl(user.avatarFilename)} />
          </Link>
        </div>
        <div className="inline__item">
          <div className="header__rate">{(+user.currentRate).toLocaleString()}°</div>
        </div>
        <div className="inline__item">
          <nav className="menu menu_responsive menu_header">
            <div className="menu__item">
              <div className="menu-popup">
                <div className="menu-popup__arrow-wrapper" role="presentation" onClick={triggerMenuPopup}>
                  <div className={`menu-popup__arrow ${menuPopupVisibility ? 'menu-popup__arrow_red' : ''}`} />
                </div>
              </div>
            </div>
          </nav>
        </div>

        {!menuPopupVisibility ?
          <div className="inline__item bell__container">
            <NotificationTrigger />
          </div> : null
        }
      </div>
    )}
  </div>
);

HeaderSide.propTypes = {
  triggerMenuPopup: PropTypes.func,
  showAuthPopup: PropTypes.func,
  user: PropTypes.objectOf(PropTypes.any),
  menuPopupVisibility: PropTypes.bool,
};

export default connect(
  state => ({
    user: selectUser(state),
    menuPopupVisibility: state.menuPopup.menuPopupVisibility,
  }),
  dispatch => bindActionCreators({
    showAuthPopup,
    triggerMenuPopup,
    hideMenuPopup,
  }, dispatch),
)(HeaderSide);
