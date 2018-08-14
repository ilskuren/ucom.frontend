import React from 'react';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import VerticalMenu from '../components/VerticalMenu';

const HomePage = () => (
  <div className="page">
    <Header />

    <div className="content">
      <div className="content__inner">
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

        <div className="posts-grid posts-grid_post-card">
          <div className="posts-grid__item">
            <div className="post-card post-card_fluid">
              <div className="post-card__inner">
                <div className="post-card__cover">
                  <img className="post-card__img" src="https://cdn-images-1.medium.com/max/2000/0*garzrb4YWfV8ummS" alt="" />
                </div>

                <div className="post-card__side">
                  <div className="post-card__rate">
                    <div className="rate">
                      <div className="rate__value">9 200 <span className="rate__degree">°</span></div>
                      <div className="rate__label">Rate</div>
                    </div>
                  </div>
                </div>

                <div className="post-card__main">
                  <div className="post-card__tags">
                    <span className="tags">
                      <span className="tags__item tags__item_icon">#</span>
                      <span className="tags__item">call</span>
                    </span>
                  </div>

                  <div className="post-card__title">
                    <h1 className="title">This Company Brings Crypto to Its 600K Of Users</h1>
                  </div>
                </div>

                <div className="post-card__footer">
                  <div className="post-card__authors">
                    <div className="avatars-list">
                      <div className="avatars-list__item">
                        <Avatar square src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
                      </div>
                      <div className="avatars-list__item">
                        <Avatar src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
                      </div>
                      <div className="avatars-list__item">
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
                      <div className="inline__item post-card__joined">
                        <div className="avatars-list avatars-list_shifted">
                          <div className="avatars-list__item">
                            <Avatar src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
                          </div>
                          <div className="avatars-list__item">
                            <Avatar src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
                          </div>
                          <div className="avatars-list__item">
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

          {[0, 0, 0, 0].map(() => (
            <div className="posts-grid__item">
              <div className="post-item">
                <div className="post-item__main">
                  <div className="post-item__tags">
                    <span className="tags">
                      <span className="tags__item tags__item_icon">#</span>
                      <span className="tags__item">Poll</span>
                    </span>
                  </div>

                  <div className="post-item__text">
                    This No-Brand Startup Won $240 Million to Fight Amazon on Price and Quality
                  </div>
                </div>
                <div className="post-item__side">
                  <div className="post-item__rate">
                    <div className="rate">
                      <div className="rate__value">9 200 <span className="rate__degree">°</span></div>
                      <div className="rate__label">Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="posts-grid">
          {[0, 0, 0].map(() => (
            <div className="posts-grid__item">
              <div className="post-item">
                <div className="post-item__cover">
                  <img className="post-item__img" src="https://cdn-images-1.medium.com/max/2000/0*garzrb4YWfV8ummS" alt="" />
                </div>

                <div className="post-item__main">
                  <div className="post-item__tags">
                    <span className="tags">
                      <span className="tags__item tags__item_icon">#</span>
                      <span className="tags__item">Poll</span>
                    </span>
                  </div>

                  <div className="post-item__text">
                    This No-Brand Startup Won $240 Million to Fight Amazon on Price and Quality
                  </div>
                </div>

                <div className="post-item__side">
                  <div className="post-item__rate">
                    <div className="rate">
                      <div className="rate__value">9 200 <span className="rate__degree">°</span></div>
                      <div className="rate__label">Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <VerticalMenu sections={['first', 'second', 'third']} />
    <div className="content content_shadows">
      <div className="content__inner">
        Feed
      </div>
    </div>
  </div>
);

export default HomePage;
