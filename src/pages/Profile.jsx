// import { Element } from 'react-scroll';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import React, { PureComponent, Fragment } from 'react';
import { selectUser } from '../store/selectors/user';
// import VerticalMenu from './VerticalMenu';
import ProfileGeneralInfoPage from './Profile/GeneralInfo';
// import ProfileWorkAndEducationPage from './Profile/WorkAndEducation';
import ProfileContactsPage from './Profile/Contacts';
import Footer from '../components/Footer';

class ProfilePage extends PureComponent {
  componentDidMount() {

  }

  render() {
    return this.props.user.id ? (
      <Fragment>
        <div className="content__inner">
          <div className="nav-bar nav-bar_simple">
            <div className="nav-bar__title">
              <h1 className="title">Edit Profile</h1>
            </div>
            <div className="nav-bar__menu">
              <div className="toolbar toolbar_responsive">
                <div className="toolbar__side">
                  <div className="inline">
                    <div className="inline__item">
                      <Link to={`/user/${this.props.user.id}`} className="button button_theme_transparent button_size_small">
                        Back to Profile
                      </Link>
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
              {/* <Route exact path="/profile/work-and-education" component={ProfileWorkAndEducationPage} /> */}
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

export default connect(state => ({
  user: selectUser(state),
}), null)(ProfilePage);
