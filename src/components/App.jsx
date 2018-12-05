import { bindActionCreators } from 'redux';
import { Router, Route, Switch } from 'react-router';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import HomePage from '../pages/Home';
import ProfilePage from '../pages/Profile';
import OrganizationPage from '../pages/Organization';
import CreatePost from '../pages/CreatePost';
import UserPage from '../pages/User';
import UsersPage from '../pages/Users';
import OrganizationsPage from '../pages/Organizations';
import AboutPage from '../pages/About';
import NotFoundPage from '../pages/NotFoundPage';
import OrganizationsCreatePage from '../pages/OrganizationsCreate';
import { setUser } from '../actions';
import { initNotificationsListeners, siteNotificationsSetUnreadAmount } from '../actions/siteNotifications';
import { fetchMyself } from '../actions/users';
import UserMenu from './UserMenu/UserMenu';
import Page from './Page';
import Post from '../pages/Post';
import Auth from './Auth';
import Notifications from './Notifications';
import Registration from './Registration/Registration';
import socket from '../api/socket';
import config from '../../package.json';
import { enableGtm } from '../utils/gtm';
import Governance from './Governance/Governance';
import Publications from '../pages/Publications';

class App extends PureComponent {
  componentDidMount() {
    enableGtm();
    this.props.fetchMyself();
    this.props.initNotificationsListeners();

    if (config.socketEnabled) {
      socket.connect();
    }
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Fragment>
          <Page>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/registration" component={Registration} />
              <Route path="/profile" component={ProfilePage} />
              <Route exact path="/user/:id" component={UserPage} />
              <Route exact path="/user/:id/:postId" component={UserPage} />
              <Route path="/posts/new/:postTypeId" component={CreatePost} />
              <Route path="/posts/:id/edit" component={CreatePost} />
              <Route exact path="/posts/:id" component={Post} />
              <Route path="/publications" component={Publications} />
              <Route path="/users" component={UsersPage} />
              <Route path="/about" component={AboutPage} />
              <Route exact path="/communities" component={OrganizationsPage} />
              <Route exact path="/communities/new" component={OrganizationsCreatePage} />
              <Route exact path="/communities/:id" component={OrganizationPage} />
              <Route exact path="/communities/:id/edit" component={OrganizationsCreatePage} />
              <Route exact path="/communities/:id/:postId" component={OrganizationPage} params={{ 'test': 1 }} />
              <Route exact path="/governance" component={Governance} />
              <Route component={NotFoundPage} />
            </Switch>

            <Auth />
            <UserMenu />
          </Page>

          <Notifications />
        </Fragment>
      </Router>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => bindActionCreators({
    setUser,
    fetchMyself,
    initNotificationsListeners,
    siteNotificationsSetUnreadAmount,
  }, dispatch),
)(App);
