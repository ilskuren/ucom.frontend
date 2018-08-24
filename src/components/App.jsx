import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import HomePage from '../pages/Home';
import ProfilePage from '../pages/Profile';
import SettingsPage from '../pages/Settings';
import CreatePost from '../pages/CreatePost';
import Posts from '../pages/Posts';
import UserPage from '../pages/User';
import { setUser } from '../actions';
import { getToken, removeToken } from '../utils/token';
import { getMyself } from '../api';
import Loading from './Loading';
import Header from './Header';

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
            <div className="page">
              <Header />

              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/settings" component={SettingsPage} />
                <Route path="/user/:id" component={UserPage} />
                <Route path="/posts/new" component={CreatePost} />
                <Route path="/posts/story" component={Posts} />
              </Switch>
            </div>
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
