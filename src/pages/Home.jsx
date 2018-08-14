import React from 'react';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import IconArrowUp from '../components/Icons/ArrowUp';
import IconArrowDown from '../components/Icons/ArrowDown';
import IconComment from '../components/Icons/Comment';
import IconShare from '../components/Icons/Share';

const HomePage = () => (
  <div className="page">
    <Header />

    <div className="content">
      <div className="content__inner">
        <div className="page-nav">
          <div className="menu menu_media menu_responsive">
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

        <div className="post-group">
          <div className="post-group__item">
            <div className="grid grid_main-post">
              <div className="grid__item">
                <div className="post-card">
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
                        <h1 className="title title_light">This Company Brings Crypto to Its 600K Of Users</h1>
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
                <div className="grid__item">
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
          </div>

          <div className="post-group__item">
            <div className="grid">
              {[0, 0, 0].map(() => (
                <div className="grid__item">
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
      </div>
    </div>

    <div className="content content_shadows">
      <div className="content__inner">

        <div className="grid grid_content">
          <div className="grid__item">
            <div classNames="feed">
              <div className="feed__title">
                <h1 className="title title_small">Ur News Feed</h1>
              </div>

              <div className="feed__post-form">
                <div className="post-input">
                  <div className="inline">
                    <div className="inline__item">
                      Hey
                    </div>
                    <div className="inline__item">
                      <Avatar src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
                    </div>
                    <div className="inline__item">
                      what’s new?
                    </div>
                  </div>
                </div>
              </div>

              <div className="feed__toolbar">
                <div className="toolbar">
                  <div className="toolbar__main">
                    <div className="menu menu_nav menu_responsive">
                      <div className="menu__item menu__item_active">
                        <button className="menu__link">All</button>
                      </div>
                      <div className="menu__item">
                        <button className="menu__link">Call</button>
                      </div>
                      <div className="menu__item">
                        <button className="menu__link">Poll</button>
                      </div>
                      <div className="menu__item">
                        <button className="menu__link">Appeal</button>
                      </div>
                      <div className="menu__item">
                        <button className="menu__link">Promote</button>
                      </div>
                    </div>
                  </div>

                  <div className="toolbar__side">
                    Sort by
                  </div>
                </div>
              </div>

              <div className="feed__list">
                {[0, 0].map(() => (
                  <div className="feed__item">
                    <div className="post">
                      <div className="post__type">Poll</div>

                      <div className="post__header">
                        <div className="toolbar">
                          <div className="toolbar__main">
                            10 min ago
                          </div>

                          <div className="toolbar__side">
                            <div className="rating">
                              <div className="inline inline_small">
                                <div className="inline__item">
                                  <div className="rating__icon">
                                    <IconArrowUp />
                                  </div>
                                </div>
                                <div className="inline__item">
                                  <div className="rating__value rating__value_up">+100</div>
                                </div>
                                <div className="inline__item">
                                  <div className="rating__icon">
                                    <IconArrowDown />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="post__user">
                        <div className="user-card">
                          <div className="user-card__avatar">
                            <Avatar src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
                          </div>
                          <div className="user-card__info">
                            <div className="user-card__name">TUDO</div>
                            <div className="user-card__account">@apple_inc</div>
                          </div>
                        </div>
                      </div>

                      <div className="post__text">
                        <h1>Camon guys, we need ur help!</h1>
                        <p>MacBook Pro 2017 or MacBook 2015?</p>
                        <p><img src="https://cdn-images-1.medium.com/max/2000/0*garzrb4YWfV8ummS" alt="" /></p>
                      </div>

                      <div className="post__vote">
                        <div className="vote">
                          <div className="vote__item">
                            <button className="vote__button">
                              <div className="vote__name">MacBook Pro 2017</div>
                              <div className="vote__value">27%</div>
                              <div className="vote__progress" style={{ width: '27%' }} />
                            </button>
                          </div>
                          <div className="vote__item">
                            <button className="vote__button">
                              <div className="vote__name">MacBook Pro 2015</div>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="post__footer">
                        <div className="toolbar">
                          <div className="toolbar__main">
                            <button className="button-clean">
                              <span className="inline inline_small">
                                <span className="inline__item">
                                  <span className="post__icon">
                                    <IconComment />
                                  </span>
                                </span>
                                <span className="inline__item">300</span>
                              </span>
                            </button>
                          </div>
                          <div className="toolbar__side">
                            <button className="button-clean">
                              <span className="inline inline_small">
                                <span className="inline__item">
                                  <span className="post__icon">
                                    <IconShare />
                                  </span>
                                </span>
                                <span className="inline__item">Share</span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid__item">
            <div className="sidebar">
              <div className="sidebar__section">
                <div className="users-group">
                  <h4 className="users-group__title">Organizations</h4>

                  <div className="users-group__list">
                    {[0, 0, 0, 0, 0].map(() => (
                      <div className="users-group__item">
                        <div className="user-card">
                          <div className="user-card__avatar">
                            <Avatar square src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
                          </div>
                          <div className="user-card__info">
                            <div className="user-card__name">TUDO</div>
                            <div className="user-card__account">@apple_inc</div>
                          </div>
                          <div className="user-card__rate">
                            <div className="rate">
                              <div className="rate__value">9 200 <span className="rate__degree">°</span></div>
                              <div className="rate__label">Rate</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="users-group__show-more">
                    <a href="#">View All</a>
                  </div>
                </div>
              </div>

              <div className="sidebar__section">
                <div className="users-group">
                  <h4 className="users-group__title">People</h4>

                  <div className="users-group__list">
                    {[0, 0, 0, 0, 0].map(() => (
                      <div className="users-group__item">
                        <div className="user-card">
                          <div className="user-card__avatar">
                            <Avatar src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
                          </div>
                          <div className="user-card__info">
                            <div className="user-card__name">TUDO</div>
                            <div className="user-card__account">@apple_inc</div>
                          </div>
                          <div className="user-card__rate">
                            <div className="rate">
                              <div className="rate__value">9 200 <span className="rate__degree">°</span></div>
                              <div className="rate__label">Rate</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="users-group__show-more">
                    <a href="#">View All</a>
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
