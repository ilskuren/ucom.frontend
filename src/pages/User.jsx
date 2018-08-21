import React, { PureComponent } from 'react';
import Avatar from '../components/Avatar';

class UserPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="content">
        <div className="content__inner">
          <div className="user-header">
            <div className="user-header__main">
              <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
            </div>

            <div className="user-header__side">
              <div className="toolbar">
                <div className="toolbar__main">
                  <div className="user-header__name">
                    <h1 className="title">Andrey Sakharidze</h1>
                  </div>

                  <div className="user-header__account-name">
                    @Druce_Wayne
                  </div>

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
              </div>
            </div>

            <div className="user-header__actions">
              <div className="toolbar">
                <div className="toolbar__main">
                  Follow button
                </div>
                <div className="toolbar__side">
                  Stats
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
