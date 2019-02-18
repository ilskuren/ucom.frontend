import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tooltip } from 'react-tippy';
import { Link } from 'react-router-dom';
import { getFileUrl } from '../../utils/upload';
import { authShowPopup } from '../../actions/auth';
import { triggerMenuPopup, hideMenuPopup } from '../../actions/menuPopup';
import { selectUser } from '../../store/selectors';
import { getUserById } from '../../store/users';
import Avatar from '../Avatar';
import NotificationTrigger from '../NotificationCards/NotificationTrigger';
import IconSearch from '../Icons/Search';
import urls from '../../utils/urls';
import { getOrganizationUrl } from '../../utils/organization';
import AvatarFromFile from '../AvatarFromFile';
import OrganizationListPopup from '../Organization/OrganizationListPopup';
import OrganizationIcon from '../Icons/Organization';
import UserMenuTrigger from '../UserMenu/UserMenuTrigger';


const HeaderMain = ({
  authShowPopup, users, user, menuPopupVisibility, triggerMenuPopup,
}) => {
  const owner = getUserById(users, user.id);
  const [visibleOrganizationListPopup, setOrganizationListPopup] = useState(false);

  const userContext = (
    <div className="header-user-menu">
      <div className="header-user-menu__caption">Publications</div>
      {/* <div className="header-user-menu__item">Drafts</div> */}
      <Link className="header-user-menu__item" to={urls.getNewPostUrl()}>New publication</Link>
      <div className="header-user-menu__caption">My communities</div>
      {user.organizations && user.organizations.slice(0, 3).map((item) => {
        const avatar = getFileUrl(item.avatarFilename);

        return (
          <Link className="header-user-menu__community" to={getOrganizationUrl(item.id)} key={item.id}>
            <div className="header-user-menu__avatar">
              {avatar && typeof avatar === 'object' ?
                <AvatarFromFile BlankIcon={OrganizationIcon} square rounded size="xmsmall" file={avatar} /> :
                <Avatar BlankIcon={OrganizationIcon} square rounded src={avatar} size="xmsmall" />}
            </div>
            <div className="header-user-menu__title">
              {item.title}
            </div>
          </Link>
          );
        })
      }

      {user.organizations && user.organizations.length > 3 ?
        <Fragment>
          <div className="header-user-menu__item" role="presentation" onClick={() => setOrganizationListPopup(true)} >View All</div>
        </Fragment> : null}

      <Link to="/communities/new" className="header-user-menu__item">Create Community</Link>
    </div>
  );

  return (
    <div className="header__main">
      {visibleOrganizationListPopup && <OrganizationListPopup readyOrganizations={user.organizations.slice(3)} onClickClose={() => setOrganizationListPopup(false)} />}

      <nav className="fixed-menu menu_header">
        {owner ?
          <Fragment>
            <div className="header-dropdown">
              <Tooltip
                useContext
                position="bottom-end"
                html={userContext}
                arrow
                interactive
                hideOnClick={false}
                theme="user"
                stick
                stickyDuration={0}
                offset={-30}
                distance={20}
              >
                <Link className="avatar-and-rate" to={`/user/${user.id}`} onClick={() => (menuPopupVisibility ? triggerMenuPopup() : null)}>
                  <div className="header__rate">{(+owner.currentRate).toLocaleString()}°</div>
                  <Avatar size="xsmall" src={getFileUrl(owner.avatarFilename)} />
                </Link>
              </Tooltip>
            </div>


            <NotificationTrigger />

            <div className={`header-search ${menuPopupVisibility ? '' : 'header-search_border'}`}>
              <IconSearch />
            </div>

            <UserMenuTrigger />

          </Fragment>
         :
          <Fragment>
            <div className={`header-search ${menuPopupVisibility ? '' : 'header-search_border'}`}>
              <IconSearch />
            </div>
            <button
              className="menu__link menu__link_upper menu_sigh-in"
              onClick={() => authShowPopup()}
            >
              SIGN in
            </button>
          </Fragment>
        }
        {/* <div className="menu__item else-desktop">
          <div className="menu-popup">
            <div className="menu-popup__arrow-wrapper" role="presentation" onClick={triggerMenuPopup}>
              <div className={`menu-popup__arrow ${menuPopupVisibility ? 'menu-popup__arrow_red' : ''}`} />
            </div>
          </div>
        </div> */}
      </nav>
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
)(HeaderMain);
