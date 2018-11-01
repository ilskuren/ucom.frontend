import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFileUrl } from '../../utils/upload';
import { showAuthPopup } from '../../actions';
import { triggerMenuPopup, hideMenuPopup } from '../../actions/menuPopup';
import { selectUser } from '../../store/selectors';
import Avatar from '../Avatar';
import IconLogo from '../Icons/Logo';
import MiniIconLogo from '../Icons/MiniLogo';
import NotificationTrigger from '../NotificationCards/NotificationTrigger';
import UserMenuTrigger from '../UserMenu/UserMenuTrigger';

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
        <div className="inline__item">
          <Link to="/">
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
          <div className="inline">
            <div className="inline__item">
              <UserMenuTrigger />
            </div>
            <div className="inline__item">
              <NotificationTrigger />
            </div>
          </div>
        </div>
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
