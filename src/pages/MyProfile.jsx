import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import FollowersPage from './MyProfile/Followers';
import Footer from '../components/Footer';
import ProfileHeader from '../components/ProfileHeader';
import FollowersAmount from '../components/FollowersAmount';

class MyProfilePage extends PureComponent {
  componentDidMount() {

  }

  render() {
    return this.props.user.id ? (
      <Fragment>
        <ProfileHeader
          name="James Franco"
          nickname="kames_franko"
          status="My status or messege"
          userRatePosition={123}
          userRate="12 293"
        />
        <div className="my-profile">
          <div className="content content_separated">
            <div className="my-profile__statistics-menu">
              <div className="toolbar">
                <div className="toolbar__main">
                  <div className="menu menu_simple-tabs">
                    <div className="menu__item">
                      <div className="rate rate_small">
                        <div className="rate__value">101</div>
                        <div className="rate__label">feed</div>
                      </div>
                    </div>
                    <div className="menu__item">
                      <div className="rate rate_small">
                        <div className="rate__value">5</div>
                        <div className="rate__label">organizations</div>
                      </div>
                    </div>
                    <div className="menu__item">
                      <div className="rate rate_small">
                        <div className="rate__value">10</div>
                        <div className="rate__label">products</div>
                      </div>
                    </div>
                    <div className="menu__item">
                      <div className="rate rate_small">
                        <div className="rate__value">4</div>
                        <div className="rate__label">events</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="toolbar">
                <div className="toolbar__main">
                  <div className="menu menu_simple-tabs">
                    <div className="menu__item">
                      <div className="menu__link menu__link_black menu__link_active">
                        <FollowersAmount status="followers" />
                      </div>
                    </div>
                    <div className="menu__item">
                      <div className="menu__link menu__link_black">
                        <FollowersAmount status="following" />
                      </div>
                    </div>
                    <div className="menu__item">
                      <div className="menu__link menu__link_black">
                        <FollowersAmount status="trusted by" />
                      </div>
                    </div>
                    <div className="menu__item">
                      <div className="menu__link menu__link_black">
                        <FollowersAmount status="joined" />
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
              <Route exact path="/my-profile/followers" component={FollowersPage} />
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

MyProfilePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};

export default connect(state => ({
  user: state.user,
}), null)(MyProfilePage);
