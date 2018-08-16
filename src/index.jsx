import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router, Route, Switch } from 'react-router';
import ReactDOM from 'react-dom';
import HomePage from './pages/Home';
import ProfileGeneralInfoPage from './pages/Profile/GeneralInfo';
import ProfileWorkAndEducationPage from './pages/Profile/WorkAndEducation';
import ProfileContactsPage from './pages/Profile/Contacts';
import SettingsAccountPage from './pages/Settings/Account';
import SettingsNotificationsPage from './pages/Settings/Notifications';
import SettingsSecurityPage from './pages/Settings/Security';
import SettingsReferralPage from './pages/Settings/Referral';
import SettingsBlacklistPage from './pages/Settings/Blacklist';

import store from './store';

import './index.less';

const history = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <div className="app">
      <Router history={history}>
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
        </Switch>
      </Router>
    </div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
