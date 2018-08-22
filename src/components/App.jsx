import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import HomePage from '../pages/Home';
import ProfilePage from '../pages/Profile';
import PostsPage from '../pages/Posts';
import SettingsAccountPage from '../pages/Settings/Account';
import SettingsNotificationsPage from '../pages/Settings/Notifications';
import SettingsSecurityPage from '../pages/Settings/Security';
import SettingsReferralPage from '../pages/Settings/Referral';
import SettingsBlacklistPage from '../pages/Settings/Blacklist';
import { setUser } from '../actions';
import { getToken, removeToken } from '../utils/token';
import { getMyself } from '../api';
import Loading from './Loading';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.restoreSession();
  }

  restoreSession() {
    const token = getToken();

    this.setState({ loading: true });

    if (token) {
      getMyself(token)
        .then((data) => {
          this.props.setUser(data);
          this.setState({ loading: false });
        })
        .catch(() => {
          removeToken();
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <Fragment>
        <Loading loading={this.state.loading} appear />

        {!this.state.loading && (
          <Router history={this.props.history}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/posts" component={PostsPage} />
              <Route exact path="/settings/account" component={SettingsAccountPage} />
              <Route exact path="/settings/notifications" component={SettingsNotificationsPage} />
              <Route exact path="/settings/security" component={SettingsSecurityPage} />
              <Route exact path="/settings/referral" component={SettingsReferralPage} />
              <Route exact path="/settings/blacklist" component={SettingsBlacklistPage} />
            </Switch>
          </Router>
        )}
      </Fragment>
    );
  }
}

App.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  setUser: PropTypes.func,
};

export default connect(null, dispatch => ({
  setUser: data => dispatch(setUser(data)),
}))(App);
