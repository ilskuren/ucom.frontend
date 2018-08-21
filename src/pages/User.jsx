import React, { PureComponent } from 'react';
import Avatar from '../components/Avatar';
import IconInfo from '../components/Icons/Info';
import Rate from '../components/Rate';

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
          <div className="content">
            <div className="content__inner">
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
                                      <Avatar borderWhite size="small" src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
                                    </div>
                                    <div className="avatars-list__item">
                                      <Avatar borderWhite size="small" src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
