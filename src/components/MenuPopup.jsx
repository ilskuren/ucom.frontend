import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Popup from './Popup';
import ModalContent from './ModalContent';
import InfoBlock from './InfoBlock';
import UserCard from './UserCard';
import Avatar from './Avatar';
import LogoutIcon from './Icons/Logout';
import { getFileUrl } from '../utils/upload';
// import { getUserUrl } from '../utils/user';
import MiniIconLogo from './Icons/MiniLogo';
import IconLogo from './Icons/Logo';
import { getOrganizationUrl } from '../utils/organization';

import av1 from '../static/avatars/1.png';
import av2 from '../static/avatars/2.png';
import av3 from '../static/avatars/3.png';

const products = [
  {
    profileName: 'Walmart',
    accountName: 'apple_inc',
    avatarUrl: av1,
  },
  {
    profileName: 'Exxon Mobil',
    accountName: 'apple_inc',
    avatarUrl: av2,
  },
  {
    profileName: 'Berkshire Hathaway',
    accountName: 'apple_inc',
    avatarUrl: av3,
  },
];

class MenuPopup extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      menuPopupVisibility: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.hidePopup();
    }
  }

  hidePopup = () => {
  }

  showPopup = () => {
  }

  logout = () => {
    this.props.logout();
    this.hidePopup();
  }

  render() {
    return (
      <Fragment>
        {this.props.menuPopupVisibility && (
          <Popup onClickClose={this.hidePopup}>
            <ModalContent onClickClose={this.hidePopup} closeText="Close">
              <div className="menu-popup">
                <div className="menu-popup__head">
                  <div className="header__inner">
                    <div className="inline inline__group">
                      {this.props.isAuth ?
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
                      {/* <div className="inline__item">
                        <Link to={getUserUrl(this.props.user.id)} onClick={this.hidePopup}>
                          <Avatar src={getFileUrl(this.props.user.avatarFilename)} />
                        </Link>
                      </div>

                      <div className="inline__item">
                        <div className="menu-popup__rate">
                          {this.props.user.currentRate}°
                        </div>
                      </div>

                      <div className="inline__item menu-popup__item-arrow" role="presentation" onClick={this.hidePopup} >
                        <div className="menu-popup__arrow menu-popup__arrow_red" role="presentation" />
                      </div> */}

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
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="menu-popup__container menu-popup__container_main">
                  <div className="menu-popup__side">
                    <div className="menu menu_vertical">
                      {this.props.isAuth ?
                        <Fragment>
                          <div className="menu__item">
                            <NavLink
                              className="menu__link"
                              activeClassName="menu__link_active"
                              to={`/user/${this.props.user.id}`}
                              onClick={this.hidePopup}
                            >
                                My profile
                            </NavLink>
                          </div>
                          <div className="menu__item">
                            <NavLink
                              className="menu__link"
                              activeClassName="menu__link_active"
                              to="/profile/general-info"
                              onClick={this.hidePopup}
                            >
                                Settings
                            </NavLink>
                          </div>
                        </Fragment> : null
                      }
                      <div className="menu__item only-phone">
                        <NavLink
                          to="/posts/new/1"
                          className="menu__link"
                        >
                          Add&nbsp;publication
                        </NavLink>
                      </div>

                      <div className="menu__item only-phone">
                        <NavLink
                          to="/users"
                          className="menu__link"
                          activeClassName="menu__link_active"
                          isActive={() => this.props.location.pathname === '/users'}
                        >
                          People
                        </NavLink>
                      </div>
                      <div className="menu__item only-phone">
                        <NavLink
                          to="/communities"
                          className="menu__link"
                          activeClassName="menu__link_active"
                          isActive={() => this.props.location.pathname === '/communities'}
                        >
                          Communities
                        </NavLink>
                      </div>
                      <div className="menu__item only-phone">
                        <NavLink
                          to="/publications/media"
                          className="menu__link"
                          activeClassName="menu__link_active"
                          isActive={() => this.props.location.pathname.indexOf('/publications') === 0}
                        >
                          Publications
                        </NavLink>
                      </div>
                      {this.props.isAuth ?
                        <div className="menu__item">
                          <div className="inline menu-popup__logout" role="presentation" onClick={this.logout}>
                            <div className="inline__item"><LogoutIcon /></div>
                            <div className="inline__item">Log out</div>
                          </div>
                        </div> : null
                      }
                    </div>
                  </div>
                  {this.props.isAuth ?
                    <div className="menu-popup__content">
                      <InfoBlock title="Communities" size="small" align="left" fixedChildren fixedTitle>
                        <div className="info-block__scrolled-list">
                          {this.props.user.organizations && this.props.user.organizations.map(item => (
                            <div className="menu-popup__content-item" key={item.id}>
                              <UserCard
                                className="user-card_text_left"
                                userName={item.title}
                                accountName={item.nickname}
                                avatarUrl={getFileUrl(item.avatarFilename)}
                                profileLink={getOrganizationUrl(item.id)}
                                squareAvatar
                                roundedAvatar
                              />
                            </div>
                          ))}
                        </div>
                        <div className="menu-popup__content-item menu-popup__create-new_fixed">
                          <NavLink
                            className="menu-popup__add"
                            to="/communities/new"
                          >
                            <div className="menu-popup__add-icon menu-popup__add-icon_new">+</div>
                            <div className="menu-popup__add-text">Create new organization</div>
                          </NavLink>
                        </div>
                      </InfoBlock>
                      {this.props.products && (
                        <div className="menu-popup__content-block">
                          <InfoBlock title="Products" size="small" align="left" line="gray-lighter">
                            {products.map((item, index) => (
                              <div className="menu-popup__content-item" key={index}>
                                <UserCard
                                  className="user-card_text_left"
                                  userName={item.profileName}
                                  accountName={item.accountName}
                                  avatarUrl={item.avatarUrl}
                                  squareAvatar
                                  sign="by @"
                                />
                              </div>
                            ))}
                            <div className="menu-popup__content-item">
                              <NavLink
                                className="menu-popup__add"
                                to="#"
                                onClick={this.hidePopup}
                              >
                                <div className="menu-popup__add-icon menu-popup__add-icon_new">
                                  +
                                </div>
                                <div className="menu-popup__add-text">
                                  Create new product
                                </div>
                              </NavLink>
                            </div>
                          </InfoBlock>
                        </div>
                      )}
                      {this.props.offers && (
                        <div className="menu-popup__content-block">
                          <InfoBlock title="Offers" size="small" align="left" line="gray-lighter">
                            {products.map((item, index) => (
                              <div className="menu-popup__content-item" key={index}>
                                <UserCard
                                  className="user-card_text_left"
                                  userName={item.profileName}
                                  accountName={item.accountName}
                                  avatarUrl={item.avatarUrl}
                                  squareAvatar
                                  sign=""
                                />
                              </div>
                            ))}
                            <div className="menu-popup__content-item">
                              <div className="menu-popup__add">
                                <div className="menu-popup__add-icon">
                                  +25
                                </div>
                                <div className="menu-popup__add-text">
                                  Show more events
                                </div>
                              </div>
                            </div>
                            <div className="menu-popup__content-item">
                              <NavLink
                                className="menu-popup__add"
                                to="#"
                                onClick={this.hidePopup}
                              >
                                <div className="menu-popup__add-icon menu-popup__add-icon_new">
                                  +
                                </div>
                                <div className="menu-popup__add-text">
                                  Create new event
                                </div>
                              </NavLink>
                            </div>
                          </InfoBlock>
                        </div>
                      )}
                    </div> : null
                  }
                </div>
              </div>
            </ModalContent>
          </Popup>
        )}
      </Fragment>
    );
  }
}

MenuPopup.propTypes = {
  // organizations: PropTypes.arrayOf(PropTypes.object),
  products: PropTypes.arrayOf(PropTypes.object),
  offers: PropTypes.arrayOf(PropTypes.object),
  logout: PropTypes.func,
};

export default withRouter(MenuPopup);
