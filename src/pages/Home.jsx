import React from 'react';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import PostItem from '../components/PostItem';
import PostInput from '../components/PostInput';
import Post from '../components/Post';
import UserCard from '../components/UserCard';
import Footer from '../components/Footer';

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
                <PostCard />
              </div>

              {[0, 0, 0, 0].map(() => (
                <div className="grid__item">
                  <PostItem />
                </div>
              ))}
            </div>
          </div>

          <div className="post-group__item">
            <div className="grid">
              {[0, 0, 0].map(() => (
                <div className="grid__item">
                  <PostItem coverImg="https://cdn-images-1.medium.com/max/2000/0*garzrb4YWfV8ummS" />
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
            <div className="feed">
              <div className="feed__title">
                <h1 className="title title_small">Ur News Feed</h1>
              </div>

              <div className="feed__post-form">
                <PostInput />
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
                    <Post />
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
                        <UserCard squareAvatar />
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
                        <UserCard />
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

        <Footer />
      </div>
    </div>
  </div>
);

export default HomePage;
