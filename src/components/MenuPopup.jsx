import React, { PureComponent, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import Popup from './Popup';
import ModalContent from './ModalContent';
import InfoBlock from './InfoBlock';
import UserCard from './UserCard';
import LogoutIcon from './Icons/Logout';

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
        <div className="menu-popup__arrow" role="presentation" onClick={this.showPopup} />
        {this.state.popupIsVisible && (
          <Popup onClickClose={this.hidePopup}>
            <ModalContent onClickClose={this.hidePopup}>
              <div className="menu-popup">
                <div className="menu-popup__head">
                </div>
                <div className="menu-popup__main">
                  <div className="menu-popup__side">
                    <div className="menu menu_vertical">
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/my-profile/feed"
                          onClick={this.hidePopup}
                        >
                          My profile
                        </NavLink>
                      </div>
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/"
                          onClick={this.hidePopup}
                        >
                          Activity Log
                        </NavLink>
                      </div>
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/settings/account"
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
                    <InfoBlock title="Organizations" size="small" align="left">
                      {products.map(item => (
                        <div className="menu-popup__content-item">
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
                      <div className="menu-popup__content-item">
                        <div className="menu-popup__add">
                          <div className="menu-popup__add-icon menu-popup__add-icon_new">
                            +
                          </div>
                          <div className="menu-popup__add-text">
                            Create new organization
                          </div>
                        </div>
                      </div>
                    </InfoBlock>
                    <InfoBlock title="Products" size="small" align="left">
                      {products.map(item => (
                        <div className="menu-popup__content-item">
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
                        <div className="menu-popup__add">
                          <div className="menu-popup__add-icon menu-popup__add-icon_new">
                            +
                          </div>
                          <div className="menu-popup__add-text">
                            Create new product
                          </div>
                        </div>
                      </div>
                    </InfoBlock>
                    <InfoBlock title="Offers" size="small" align="left">
                      {products.map(item => (
                        <div className="menu-popup__content-item">
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
                        <div className="menu-popup__add">
                          <div className="menu-popup__add-icon menu-popup__add-icon_new">
                            +
                          </div>
                          <div className="menu-popup__add-text">
                            Create new event
                          </div>
                        </div>
                      </div>
                    </InfoBlock>
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
  logout: PropTypes.func,
};

export default MenuPopup;
