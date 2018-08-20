import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import React, { PureComponent, Fragment } from 'react';
import ProfileGeneralInfoPage from './Profile/GeneralInfo';
import ProfileWorkAndEducationPage from './Profile/WorkAndEducation';
import ProfileContactsPage from './Profile/Contacts';

class ProfilePage extends PureComponent {
  componentDidMount() {

  }

  render() {
    return this.props.user.id ? (
      <Fragment>
        <Route exact path="/profile/general-info" component={ProfileGeneralInfoPage} />
        <Route exact path="/profile/work-and-education" component={ProfileWorkAndEducationPage} />
        <Route exact path="/profile/contacts" component={ProfileContactsPage} />
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
