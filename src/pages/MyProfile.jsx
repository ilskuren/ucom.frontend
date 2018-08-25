import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import React, { PureComponent, Fragment } from 'react';
import FollowersPage from './MyProfile/Followers';
import Footer from '../components/Footer';
import FollowersAmount from '../components/FollowersAmount';

class MyProfilePage extends PureComponent {
  componentDidMount() {

  }

  render() {
    return this.props.user.id ? (
      <div className="content">
        <div className="content__inner">
          <div className="my-profile">
            <div className="my-profile__statisttics-menu">
              <div className="my-profile__statistics-menu">
                <FollowersAmount />
              </div>
            </div>
          </div>
          <Fragment>
            <Route exact path="/my-profile/followers" component={FollowersPage} />
          </Fragment>

          <Footer />
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

MyProfilePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};

export default connect(state => ({
  user: state.user,
}), null)(MyProfilePage);
