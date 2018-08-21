import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import React, { PureComponent, Fragment } from 'react';
import ProfileGeneralInfoPage from './Profile/GeneralInfo';
import ProfileWorkAndEducationPage from './Profile/WorkAndEducation';
import ProfileContactsPage from './Profile/Contacts';
import Button from '../components/Button';
import Footer from '../components/Footer';

class ProfilePage extends PureComponent {
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
                          to="/profile/general-info"
                          isActive={() => this.props.location.pathname === '/profile/general-info'}
                        >
                          General Info
                        </NavLink>
                      </div>
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/profile/work-and-education"
                          isActive={() => this.props.location.pathname === '/profile/work-and-education'}
                        >
                          Work & Education
                        </NavLink>
                      </div>
                      <div className="menu__item">
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to="/profile/contacts"
                          isActive={() => this.props.location.pathname === '/profile/contacts'}
                        >
                          Contacts
                        </NavLink>
                      </div>
                    </div>
                  </div>

                  <div className="toolbar__side">
                    <div className="inline">
                      <div className="inline__item">
                        <Button text="Back to Profile" size="small" theme="transparent" />
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
              <Route exact path="/profile/general-info" component={ProfileGeneralInfoPage} />
              <Route exact path="/profile/work-and-education" component={ProfileWorkAndEducationPage} />
              <Route exact path="/profile/contacts" component={ProfileContactsPage} />
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

ProfilePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};

export default connect(state => ({
  user: state.user,
}), null)(ProfilePage);
