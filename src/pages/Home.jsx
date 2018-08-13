import React from 'react';
import Header from '../components/Header';

const HomePage = () => (
  <div className="page">
    <Header />

    <div className="content">
      <div className="menu menu_media">
        <div className="menu__item menu__item_active">
          <a href="#" className="menu__link">Editorial Media</a>
        </div>
        <div className="menu__item">
          <a href="#" className="menu__link">Community Media</a>
        </div>
        <div className="menu__item">
          <a href="#" className="menu__link">Organizations Offers</a>
        </div>
        <div className="menu__item">
          <a href="#" className="menu__link">People Offers</a>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
