import { bindActionCreators } from 'redux';
import { Router, Route, Switch } from 'react-router';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import HomePage from '../pages/Home';
import ProfilePage from '../pages/Profile';
import OrganizationPage from '../pages/Organization';
import CreatePost from '../pages/CreatePost';
import UserPage from '../pages/User';
import EventsPage from '../pages/Events';
import UsersPage from '../pages/Users';
import OrganizationsPage from '../pages/Organizations';
import NotFoundPage from '../pages/NotFoundPage';
import OrganizationsCreatePage from '../pages/OrganizationsCreate';
import { setUser } from '../actions';
import { authSetVisibility } from '../actions/auth';
import { initNotificationsListeners, siteNotificationsSetUnreadAmount } from '../actions/siteNotifications';
import { fetchMyself } from '../actions/users';
import Header from './Header/Header';
import UserMenu from './UserMenu/UserMenu';
import SignUp from '../pages/SignUp';
import Page from './Page';
import Post from '../pages/Post';
import Popup from './Popup';
import Auth from './Auth';
import Notifications from './Notifications';
import socket from '../api/socket';
import config from '../../package.json';
import { enableGtm } from '../utils/gtm';
import Governance from './Governance/Governance';

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
      <Fragment>
        <div id="portal-root" />

        <Router history={this.props.history}>
          <Page>
            <Header />

            <div className="page__content">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/profile" component={ProfilePage} />
                <Route exact path="/user/:id" component={UserPage} />
                <Route exact path="/user/:id/:postId" component={UserPage} />
                <Route path="/posts/new/:postTypeId" component={CreatePost} />
                <Route path="/posts/:id/edit" component={CreatePost} />
                <Route exact path="/posts/:id" component={Post} />
                <Route path="/publications" component={EventsPage} />
                <Route path="/users" component={UsersPage} />
                <Route exact path="/communities" component={OrganizationsPage} />
                <Route exact path="/communities/new" component={OrganizationsCreatePage} />
                <Route exact path="/communities/:id" component={OrganizationPage} />
                <Route exact path="/communities/:id/edit" component={OrganizationsCreatePage} />
                <Route exact path="/communities/:id/:postId" component={OrganizationPage} />
                <Route exact path="/governance" component={Governance} />
                <Route component={NotFoundPage} />
              </Switch>
            </div>

            {this.props.auth.visibility &&
              <Popup onClickClose={() => this.props.authSetVisibility(false)}>
                <Auth onClickClose={() => this.props.authSetVisibility(false)} />
              </Popup>
            }

            <Notifications />
            <UserMenu />
          </Page>
        </Router>
      </Fragment>
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
    authSetVisibility,
    initNotificationsListeners,
    siteNotificationsSetUnreadAmount,
  }, dispatch),
)(App);
