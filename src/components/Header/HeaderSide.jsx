import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFileUrl } from '../../utils/upload';
import { authShowPopup } from '../../actions/auth';
import { triggerMenuPopup, hideMenuPopup } from '../../actions/menuPopup';
import { selectUser } from '../../store/selectors';
import Avatar from '../Avatar';
import NotificationTrigger from '../NotificationCards/NotificationTrigger';
import UserMenuTrigger from '../UserMenu/UserMenuTrigger';
import Logo from '../Logo/Logo';
import { getUserById } from '../../store/users';

const HeaderSide = ({
  user, authShowPopup, triggerMenuPopup, menuPopupVisibility, users,
}) => {
  const owner = getUserById(users, user.id);

  return (
    <div className="header__side">
      {!owner ? (
        <nav className="menu menu_header">
          <div className="menu__item">
            <Link to="/" className="menu__link">
              <span className="only-pad"><Logo /></span>
              <span className="else-pad"><Logo mod="small" /></span>
            </Link>
          </div>

          <div className="menu__item">
            <button
              className="menu__link menu__link_upper"
              onClick={() => authShowPopup()}
            >
              SIGN in
            </button>
          </div>

          <div className="menu__item else-desktop">
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
              <Logo mod="small" />
            </Link>
          </div>

          <div className="inline__item">
            <Link to={`/user/${user.id}`}>
              <Avatar src={getFileUrl(owner.avatarFilename)} />
            </Link>
          </div>

          <div className="inline__item">
            <div className="header__rate">{(+owner.currentRate).toLocaleString()}°</div>
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
};

export default connect(
  state => ({
    user: selectUser(state),
    users: state.users,
    menuPopupVisibility: state.menuPopup.menuPopupVisibility,
  }),
  dispatch => bindActionCreators({
    authShowPopup,
    triggerMenuPopup,
    hideMenuPopup,
  }, dispatch),
)(HeaderSide);
