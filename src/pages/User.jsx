import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import UserFeed from '../components/Feed/UserFeed';
import UserHead from '../components/User/UserHead';
import UserOrganizations from '../components/User/UserOrganizations';
import UserAbout from '../components/User/UserAbout';
import UserLocation from '../components/User/UserLocation';
import UserBlockchainSince from '../components/User/UserBlockchainSince';
import UserNetworks from '../components/User/UserNetworks';
import UserSocialNetworks from '../components/User/UserSocialNetworks';
import UserJobs from '../components/User/UserJobs';
import UserEducation from '../components/User/UserEducation';
import UserCreatedAt from '../components/User/UserCreatedAt';
import { selectUser } from '../store/selectors/user';
import { fetchUser } from '../actions/users';

class UserPage extends PureComponent {
  componentDidMount() {
    this.getData(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.getData(nextProps.match.params.id);
    }
  }

  getData(userId) {
    this.props.fetchUser(userId);
  }

  render() {
    return (
      <div className="content">
        <div className="content__inner">

          <div className="sheets">
            <div className="sheets__content">
              <UserHead userId={+this.props.match.params.id} />

              <div className="grid grid_user">
                <div className="grid__item">
                  <UserAbout userId={+this.props.match.params.id} />
                  <UserOrganizations userId={+this.props.match.params.id} />
                  <UserFeed
                    userId={+this.props.match.params.id}
                    pinnedPostId={+this.props.match.params.postId}
                  />
                </div>

                <div className="grid__item">
                  <UserLocation userId={+this.props.match.params.id} />
                  <UserBlockchainSince userId={+this.props.match.params.id} />
                  <UserNetworks userId={+this.props.match.params.id} />
                  <UserSocialNetworks userId={+this.props.match.params.id} />
                  <UserJobs userId={+this.props.match.params.id} />
                  <UserEducation userId={+this.props.match.params.id} />
                  <UserCreatedAt userId={+this.props.match.params.id} />
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

UserPage.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    fetchUser,
  }, dispatch),
)(UserPage);
