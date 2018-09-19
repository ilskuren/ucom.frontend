import { connect } from 'react-redux';
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import React, { PureComponent, Fragment } from 'react';
import Footer from '../components/Footer';
import NotificationsList from '../components/NotificationsList';

class NotificationsPage extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <Fragment>
        <div className="content content_separated">
          <div className="content__inner">
            <div className="nav-bar nav-bar_simple">
              <div className="nav-bar__title">
                <h1 className="title">Notifications</h1>
              </div>
              <div className="nav-bar__menu">
                <div className="toolbar toolbar_responsive">
                  <div className="toolbar__main">
                    <div className="menu menu_simple-tabs">
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/notifications/all"
                          isActive={() => this.props.location.pathname === '/notifications/all'}
                        >
                          All Notifications
                        </NavLink>
                      </div>
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/notifications/feed"
                          isActive={() => this.props.location.pathname === '/notifications/feed'}
                        >
                          User Feed
                        </NavLink>
                      </div>
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/notifications/updates"
                          isActive={() => this.props.location.pathname === '/notifications/updates'}
                        >
                          Updates
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="content__inner">
            <Fragment>
              <Route exact path="/notifications/all" component={NotificationsList} />
              <Route exact path="/notifications/feed" component={NotificationsList} />
              <Route exact path="/notifications/updates" component={NotificationsList} />
            </Fragment>
            <Footer />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => ({
  user: state.user,
}), null)(NotificationsPage);
