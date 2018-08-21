import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import HomePage from '../pages/Home';
import ProfileGeneralInfoPage from '../pages/Profile/GeneralInfo';
import ProfileWorkAndEducationPage from '../pages/Profile/WorkAndEducation';
import ProfileContactsPage from '../pages/Profile/Contacts';
import SettingsAccountPage from '../pages/Settings/Account';
import SettingsNotificationsPage from '../pages/Settings/Notifications';
import SettingsSecurityPage from '../pages/Settings/Security';
import SettingsReferralPage from '../pages/Settings/Referral';
import SettingsBlacklistPage from '../pages/Settings/Blacklist';
import PostStoryPage from '../pages/Post/Story';
import { setUser } from '../actions';
import { getToken } from '../utils/token';
import { getMyself } from '../api';
import Loading from './Loading';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.restoreSession();
  }

  restoreSession() {
    const token = getToken();

    if (token) {
      this.setState({ loading: true });

      getMyself(token)
        .then((data) => {
          this.props.setUser(data);
          this.setState({ loading: false });
        })
        .catch(() => {
          this.setState({ loading: false });
        });
    }
  }

  render() {
    return (
      <Fragment>
        <Loading loading={this.state.loading} />

        {!this.state.loading && (
          <Router history={this.props.history}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/profile/general-info" component={ProfileGeneralInfoPage} />
              <Route exact path="/profile/work-and-education" component={ProfileWorkAndEducationPage} />
              <Route exact path="/profile/contacts" component={ProfileContactsPage} />
              <Route exact path="/settings/account" component={SettingsAccountPage} />
              <Route exact path="/settings/notifications" component={SettingsNotificationsPage} />
              <Route exact path="/settings/security" component={SettingsSecurityPage} />
              <Route exact path="/settings/referral" component={SettingsReferralPage} />
              <Route exact path="/settings/blacklist" component={SettingsBlacklistPage} />
              <Route exact path="/post/story" component={PostStoryPage} />
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
