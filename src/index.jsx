import { createBrowserHistory } from 'history';
import React from 'react';
import { Router, Route, Switch } from 'react-router';
import ReactDOM from 'react-dom';
import HomePage from './pages/Home';
import ProfileGeneralInfoPage from './pages/Profile/GeneralInfo';
import ProfileWorkAndEducationPage from './pages/Profile/WorkAndEducation';
import ProfileContactsPage from './pages/Profile/Contacts';

import './index.less';

const history = createBrowserHistory();

const App = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/profile/general-info" component={ProfileGeneralInfoPage} />
      <Route exact path="/profile/work-and-education" component={ProfileWorkAndEducationPage} />
      <Route exact path="/profile/contacts" component={ProfileContactsPage} />
    </Switch>
  </Router>
);

ReactDOM.render(App, document.getElementById('app'));
