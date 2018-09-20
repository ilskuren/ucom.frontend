import React, { PureComponent, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import Popup from './Popup';
import ModalContent from './ModalContent';
import InfoBlock from './InfoBlock';
import UserCard from './UserCard';
import Avatar from './Avatar';
import Rate from './Rate';
import LogoutIcon from './Icons/Logout';
import { getFileUrl } from '../utils/upload';
import { getUserUrl } from '../utils/user';

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
      popupIsVisible: false,
    };
  }

  @bind
  hidePopup() {
    this.setState({ popupIsVisible: false });
  }

  @bind
  showPopup() {
    this.setState({ popupIsVisible: true });
  }

  @bind
  logout() {
    this.props.logout();
    this.hidePopup();
  }


  render() {
    return (
      <Fragment>
        <div className="menu-popup">
          <div className="menu-popup__arrow-wrapper" role="presentation" onClick={this.showPopup}>
            <div className="menu-popup__arrow" />
          </div>
        </div>
        {this.state.popupIsVisible && (
          <Popup onClickClose={this.hidePopup}>
            <ModalContent onClickClose={this.hidePopup} closeText="Close">
              <div className="menu-popup">
                <div className="menu-popup__head">
                  <div className="inline">
                    <div className="inline__item">
                      <Link to={getUserUrl(this.props.user.id)} onClick={this.hidePopup}>
                        <Avatar src={getFileUrl(this.props.user.avatarFilename)} size="msmall" />
                      </Link>
                    </div>

                    <div className="inline__item">
                      <Rate value={this.props.user.currentRate} label="" className="rate_small rate_no-label" />
                    </div>

                    <div className="inline__item">
                      <div className="menu-popup__arrow menu-popup__arrow_red" role="presentation" />
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
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="menu-popup__main">
                  <div className="menu-popup__side">
                    <div className="menu menu_vertical">
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/my-profile"
                          onClick={this.hidePopup}
                        >
                          My profile
                        </NavLink>
                      </div>
                      {/* <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/"
                          onClick={this.hidePopup}
                        >
                          Activity Log
                        </NavLink>
                      </div> */}
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
                      <div className="menu__item">
                        <div className="inline menu-popup__logout" role="presentation" onClick={this.logout}>
                          <div className="inline__item"><LogoutIcon /></div>
                          <div className="inline__item">Log out</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="menu-popup__content">
                    <div className="menu-popup__content-block">
                      <InfoBlock title="Organizations" size="small" align="left" line="gray-lighter">
                        {this.props.organizations || products.map((item, index) => (
                          <div className="menu-popup__content-item" key={index}>
                            <UserCard
                              className="user-card_text_left"
                              userName={item.profileName}
                              accountName={item.accountName}
                              avatarUrl={item.avatarUrl}
                              squareAvatar
                              sign="@"
                            />
                          </div>
                        ))}
                        {/* <div className="menu-popup__content-item">
                          <NavLink
                            className="menu-popup__add"
                            to="/organizations/new"
                            onClick={this.hidePopup}
                          >
                            <div className="menu-popup__add-icon menu-popup__add-icon_new">
                              +
                            </div>
                            <div className="menu-popup__add-text">
                                Create new organization
                            </div>
                          </NavLink>
                        </div> */}
                      </InfoBlock>
                    </div>
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
                  </div>
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
  organizations: PropTypes.arrayOf(PropTypes.object),
  products: PropTypes.arrayOf(PropTypes.object),
  offers: PropTypes.arrayOf(PropTypes.object),
  logout: PropTypes.func,
};

export default MenuPopup;
