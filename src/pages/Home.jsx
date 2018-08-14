import React from 'react';
import Header from '../components/Header';
import Dropdown from '../components/Dropdown';

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
    <div style={{ width: '400px', margin: '10px 40px' }}>
      <Dropdown
        text="chosen item"
        options={['first', 'second']}
        label="Label"
        error="Some error"
      />
      <Dropdown
        isOpened
        text="chosen item"
        options={['first', 'second']}
        label="Label"
      />
    </div>
  </div>
);

export default HomePage;
