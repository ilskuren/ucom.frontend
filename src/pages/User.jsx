import React, { PureComponent } from 'react';
import Avatar from '../components/Avatar';
import IconInfo from '../components/Icons/Info';
import Rate from '../components/Rate';
import IconLink from '../components/Icons/Link';
import Post from '../components/Post';

class UserPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="sheets">
        <div className="sheets__list">
          <div className="sheets__item">
            <div className="sheets__inner">10 Products</div>
          </div>
          <div className="sheets__item">
            <div className="sheets__inner">104 Events</div>
          </div>
        </div>

        <div className="sheets__content">
          <div className="user-header">
            <div className="user-header__main">
              <Avatar size="medium" src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
            </div>

            <div className="user-header__side">
              <div className="toolbar toolbar_top">
                <div className="toolbar__main">
                  <div className="user-header__name">
                    <h1 className="title title_light">Andrey Sakharidze</h1>
                  </div>

                  <div className="user-header__account-name">@Druce_Wayne</div>

                  <div className="user-header__info">
                    <div className="inline">
                      <div className="inline__item">
                        Product designer
                      </div>
                      <div className="inline__item">
                        32 y.o.
                      </div>
                    </div>
                  </div>

                  <div className="user-header__status">
                    Memento Mori – n the European Christian art context
                  </div>
                </div>
                <div className="toolbar__side">
                  <div className="user-header__rate">
                    <Rate className="rate_big" />
                  </div>
                </div>
              </div>

              <div className="user-header__actions">
                <div className="toolbar">
                  <div className="toolbar__main">
                    <div className="inline inline_large">
                      <div className="inline__item">
                        <button className="button button_theme_transparent button_size_medium">Follow</button>
                      </div>
                      <div className="inline__item">
                        <div className="inline inline_small">
                          <div className="inline__item">
                            Trusted you
                          </div>
                          <div className="inline__item">
                            <span className="icon">
                              <IconInfo />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="toolbar__side">
                    <div className="inline inline_large">
                      {[0, 0, 0].map(() => (
                        <div className="inline__item">
                          <div className="follwers">
                            <div className="follwers__main">
                              <div className="follwers__count">8 923</div>
                              <div className="follwers__title">Following</div>
                            </div>
                            <div className="follwers__side">
                              <div className="avatars-list avatars-list_dual">
                                <div className="avatars-list__item">
                                  <Avatar borderWhite size="xsmall" src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
                                </div>
                                <div className="avatars-list__item">
                                  <Avatar borderWhite size="xsmall" src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
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
          </div>

          <div className="grid grid_user">
            <div className="grid__item">
              <div className="user-section">
                <div className="user-section__title">
                  <h2 className="title title_xsmall title_light">About</h2>
                </div>
                <div className="user-section__text">
                  <div className="text">
                    <p>Was a Russian nuclear physicist, dissident, and activist for disarmament, peace and human rights. He became renowned as the designer of the Soviet Union's RDS-37, a codename for Soviet development of thermonuclear weapons.</p>
                  </div>
                </div>
              </div>

              <div className="user-section">
                <div className="user-section__title">
                  <h2 className="title title_xsmall title_light">Organization</h2>
                </div>

                <div className="user-section__tabs">
                  <div className="menu menu_nav menu_responsive">
                    <div className="menu__item menu__item_active">
                      <button className="menu__link">My</button>
                    </div>
                    <div className="menu__item">
                      <button className="menu__link">Joined</button>
                    </div>
                    <div className="menu__item">
                      <button className="menu__link">Trusted</button>
                    </div>
                    <div className="menu__item">
                      <button className="menu__link">Followed</button>
                    </div>
                  </div>
                </div>

                <div className="user-section__organization">
                  <ul className="app-list">
                    {[0, 0, 0, 0, 0, 0].map(() => (
                      <li className="app-list__item">
                        <div className="app-list__avatar">
                          <Avatar square size="small" src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
                        </div>
                        <div className="app-list__name">Dribbble</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="user-section">
                <div className="user-section__title">
                  <h2 className="title title_xsmall title_light">Feed</h2>
                </div>
                <div className="post-list">
                  {[0, 0, 0].map(() => (
                    <div className="post-list__item">
                      <Post />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid__item">
              <div className="user-section">
                <div className="user-section__title">
                  <h3 className="title title_xsmall title_light">Location</h3>
                </div>
                <div className="user-section__content">
                  Russia, Moscow
                </div>
              </div>

              <div className="user-section">
                <div className="user-section__title">
                  <h3 className="title title_xsmall title_light">In Blockchain since</h3>
                </div>
                <div className="user-section__content">
                  <div className="toolbar">
                    <div className="toolbar__main">
                      BTC
                    </div>
                    <div className="toolbar__side">
                      2013
                    </div>
                  </div>
                </div>
              </div>

              <div className="user-section">
                <div className="user-section__title">
                  <h3 className="title title_xsmall title_light">Networks</h3>
                </div>
                <div className="user-section__content">
                  <div className="data">
                    <div className="data__item">
                      <div className="data__value">+7 937 678 643</div>
                      <div className="data__label">Phone</div>
                    </div>
                    <div className="data__item">
                      <div className="data__value">tayler_soap@club.ru</div>
                      <div className="data__label">Email</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="user-section">
                <div className="user-section__title">
                  <h3 className="title title_xsmall title_light">Social Networks</h3>
                </div>
                <div className="user-section__content">
                  <ul className="links">
                    {[0, 0, 0, 0].map(() => (
                      <li className="links__item">
                        <span className="inline">
                          <span className="inline__item">
                            <span className="icon">
                              <IconLink />
                            </span>
                          </span>
                          <span className="inline__item">
                            <a href="#">
                              tydo.com
                            </a>
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="user-section">
                <div className="user-section__title">
                  <h3 className="title title_xsmall title_light">Work Experience</h3>
                </div>
                <div className="user-section__content">
                  <ul className="experience">
                    {[0, 0, 0, 0].map(() => (
                      <li className="experience__item">
                        <div className="experience__header">
                          <div className="toolbar">
                            <div className="toolbar__main">
                              <div className="experience__name">Google</div>
                            </div>
                            <div className="toolbar__main">
                              <div className="experience__state">
                                2018 – Now
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="experience__status">Designer</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="user-section">
                <div className="user-section__title">
                  <h3 className="title title_xsmall title_light">Education</h3>
                </div>
                <div className="user-section__content">
                  <ul className="experience">
                    {[0, 0].map(() => (
                      <li className="experience__item">
                        <div className="experience__header">
                          <div className="toolbar">
                            <div className="toolbar__main">
                              <div className="experience__name">Harvard</div>
                            </div>
                            <div className="toolbar__main">
                              <div className="experience__state">
                                2018 – Now
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="experience__status">Designer</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="user-section">
                <div className="user-section__title">
                  <h3 className="title title_xsmall title_light">Created</h3>
                </div>
                <div className="user-section__content">
                  8 Jul 2018
                </div>
              </div>

              <div className="user-section">
                <button className="button button_theme_transparent button_size_medium">Share this profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
