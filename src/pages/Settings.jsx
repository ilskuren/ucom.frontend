import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { NavLink, Link } from 'react-router-dom';
import React, { PureComponent, Fragment } from 'react';
import Footer from '../components/Footer';
import { selectUser } from '../store/selectors/user';
import SettingsAccountPage from './Settings/Account';
import SettingsNotificationsPage from './Settings/Notifications';
import SettingsSecurityPage from './Settings/Security';
import SettingsReferralPage from './Settings/Referral';
import SettingsBlacklistPage from './Settings/Blacklist';
import SettingsWalletPage from './Settings/Wallet';
import SettingsPrivacyPage from './Settings/Privacy';

class SettingsPage extends PureComponent {
  componentDidMount() {

  }

  render() {
    return this.props.user.id ? (
      <Fragment>
        <div className="content content_separated">
          <div className="content__inner">
            <div className="nav-bar nav-bar_simple">
              <div className="nav-bar__title">
                <h1 className="title">Edit Profile</h1>
              </div>
              <div className="nav-bar__menu">
                <div className="toolbar toolbar_responsive">
                  <div className="toolbar__main">
                    <div className="menu menu_simple-tabs">
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/settings/account"
                          isActive={() => this.props.location.pathname === '/settings/account'}
                        >
                          Account
                        </NavLink>
                      </div>
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/settings/notifications"
                          isActive={() => this.props.location.pathname === '/settings/notifications'}
                        >
                          Notifications
                        </NavLink>
                      </div>
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/settings/security"
                          isActive={() => this.props.location.pathname === '/settings/security'}
                        >
                          Security
                        </NavLink>
                      </div>
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/settings/privacy"
                          isActive={() => this.props.location.pathname === '/settings/privacy'}
                        >
                          Privacy
                        </NavLink>
                      </div>
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/settings/referral"
                          isActive={() => this.props.location.pathname === '/settings/referral'}
                        >
                          Referral
                        </NavLink>
                      </div>
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/settings/blacklist"
                          isActive={() => this.props.location.pathname === '/settings/blacklist'}
                        >
                          BlackList
                        </NavLink>
                      </div>
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/settings/wallet"
                          isActive={() => this.props.location.pathname === '/settings/wallet'}
                        >
                          Wallet
                        </NavLink>
                      </div>
                    </div>
                  </div>

                  <div className="toolbar__side">
                    <div className="inline">
                      <div className="inline__item">
                        <Link to={`/user/${this.props.user.id}`} className="button button_theme_transparent button_size_small">
                          Back to Profile
                        </Link>
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
              <Route exact path="/settings/account" component={SettingsAccountPage} />
              <Route exact path="/settings/notifications" component={SettingsNotificationsPage} />
              <Route exact path="/settings/security" component={SettingsSecurityPage} />
              <Route exact path="/settings/referral" component={SettingsReferralPage} />
              <Route exact path="/settings/blacklist" component={SettingsBlacklistPage} />
              <Route exact path="/settings/wallet" component={SettingsWalletPage} />
              <Route exact path="/settings/privacy" component={SettingsPrivacyPage} />
            </Fragment>
            <Footer />
          </div>
        </div>
      </Fragment>
    ) : (
      <Redirect to="/" />
    );
  }
}

SettingsPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};

export default connect(state => ({
  user: selectUser(state),
}), null)(SettingsPage);
