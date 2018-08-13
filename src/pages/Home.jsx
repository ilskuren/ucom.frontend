import React from 'react';
import Header from '../components/Header';
import Avatar from '../components/Avatar';

const HomePage = () => (
  <div className="page">
    <Header />

    <div className="content">
      <div className="page-nav">
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

      <div className="posts-group">
        <div className="posts-group__main">
          <div className="post-card">
            <img className="post-card__img" src="https://cdn-images-1.medium.com/max/2000/1*BchBq5jkzBFZKfH5SrQGTQ.jpeg" alt="" />

            <div className="post-card__rate">
              <div className="rate">
                <div className="rate__value">9 200°</div>
                <div className="rate__label">Rate</div>
              </div>
            </div>

            <div className="post-card__tags">
              <span className="tags">
                <span className="tags__icon">#</span>
                <span className="tags__item">call</span>
              </span>
            </div>

            <h1 className="post-card__title">This Company Brings Crypto to Its 600K Of Users</h1>

            <div className="post-card__authors">
              <div className="avatars">
                <div className="avatars__item">
                  <Avatar square src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
                </div>
                <div className="avatars__item">
                  <Avatar src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
                </div>
                <div className="avatars__item">
                  <Avatar src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
                </div>
              </div>
            </div>

            <div className="post-card__users">
              <div className="inline">
                <div className="inline__item">
                  <div className="rate">
                    <div className="rate__value">354</div>
                    <div className="rate__label">Comments</div>
                  </div>
                </div>
                <div className="inline__item">
                  <div className="rate">
                    <div className="rate__value">8 923</div>
                    <div className="rate__label">Joined</div>
                  </div>
                </div>
                <div className="inline__item">
                  <div className="avatars avatars_shifted">
                    <div className="avatars__item">
                      <Avatar src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
                    </div>
                    <div className="avatars__item">
                      <Avatar src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
                    </div>
                    <div className="avatars__item">
                      <Avatar src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
