import React from 'react';
import Header from '../components/Header';
import TextInput from '../components/TextInput';

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
    <div className="text-input-wrapper">
      <TextInput label="Label" placeholder="label" />
    </div>
    <div className="text-input-wrapper">
      <TextInput placeholder="label" />
    </div><br />
    <div className="text-input-wrapper">
      <TextInput placeholder="label" subtext="Subtext" />
    </div><br />
    <div className="text-input-wrapper">
      <TextInput placeholder="label" error="Critical Error" />
    </div><br />
    <div className="text-input-wrapper">
      <TextInput placeholder="label" isSearch />
    </div>
    <div className="text-input-wrapper">
      <TextInput value="ddd" placeholder="label" />
    </div>
  </div>
);

export default HomePage;
