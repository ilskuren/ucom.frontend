import React from 'react';
import IconBell from '../components/Icons/Bell';
import IconNotification from '../components/Icons/Notification';
import IconSearch from '../components/Icons/Search';
import Avatar from '../components/Avatar';

const Header = () => (
  <div className="header">
    <div className="header__side">
      <div className="inline">
        <div className="inline__item">
          <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
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
    </div>

    <div className="header__main">
      <nav className="menu menu_responsive">
        <div className="menu__item menu__item_active">
          <a href="#" className="menu__link">Create Event</a>
        </div>
        <div className="menu__item">
          <a href="#" className="menu__link">People</a>
        </div>
        <div className="menu__item">
          <a href="#" className="menu__link">Organizations</a>
        </div>
        <div className="menu__item">
          <a href="#" className="menu__link">Products</a>
        </div>
        <div className="menu__item">
          <a href="#" className="menu__link">Events</a>
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

export default Header;
