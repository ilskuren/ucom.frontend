import MetaTags from 'react-meta-tags';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserFeed from '../components/Feed/UserFeed';
import UserHead from '../components/User/UserHead';
import UserOrganizations from '../components/User/UserOrganizations';
import UserAbout from '../components/User/UserAbout';
import UserSocialNetworks from '../components/User/UserSocialNetworks';
// import UserLocation from '../components/User/UserLocation';
// import UserBlockchainSince from '../components/User/UserBlockchainSince';
import UserNetworks from '../components/User/UserNetworks';
// import UserJobs from '../components/User/UserJobs';
// import UserEducation from '../components/User/UserEducation';
import UserCreatedAt from '../components/User/UserCreatedAt';
import LayoutBase from '../components/Layout/LayoutBase';
import { selectUser } from '../store/selectors/user';
import { fetchUser } from '../actions/users';
import { getUserById } from '../store/users';

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
    const userId = +this.props.match.params.id;
    const user = getUserById(this.props.users, userId);

    if (!user) {
      return null;
    }

    return (
      <LayoutBase>
        <MetaTags>
          <title>U°Community - {user.firstName}</title>
        </MetaTags>

        <div className="content content_sheet">
          <div className="content__inner">
            <UserHead userId={userId} />

            <div className="grid grid_user">
              <div className="grid__item">
                <UserAbout userId={userId} />
                <UserFeed
                  userId={userId}
                  pinnedPostId={+this.props.match.params.postId}
                />
              </div>

              <div className="grid__item">
                <UserOrganizations userId={userId} />
                <UserSocialNetworks userId={userId} />
                <UserNetworks userId={userId} />
                <UserCreatedAt userId={userId} />
                {/* <UserLocation userId={userId} /> */}
                {/* <UserBlockchainSince userId={userId} /> */}
                {/* <UserJobs userId={userId} /> */}
                {/* <UserEducation userId={userId} /> */}
              </div>
            </div>
          </div>
        </div>
      </LayoutBase>
    );
  }
}

export default connect(
  state => ({
    users: state.users,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    fetchUser,
  }, dispatch),
)(UserPage);
