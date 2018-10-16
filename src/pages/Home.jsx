import humps from 'lodash-humps';
import { connect } from 'react-redux';
import React, { Fragment, PureComponent } from 'react';
import Footer from '../components/Footer';
import PostsGroupTabs from '../components/PostsGroupTabs';
import UserNewsFeed from '../components/Feed/UserNewsFeed';
import UsersGroup from '../components/UsersGroup';
import Promo from '../components/Promo';
import { selectUser } from '../store/selectors';
import { fetchUser } from '../actions/users';

class HomePage extends PureComponent {
  componentDidMount() {
    this.props.fetchUser(this.props.user.id);
  }

  render() {
    const user = humps(this.props.user);

    return (
      <Fragment>
        <div className="content">
          <div className="content__inner">
            <PostsGroupTabs />
          </div>
        </div>

        <div className="content content_shadows">
          {this.props.user.id ? (
            <div className="content__inner">
              <div className="grid grid_content">
                <div className="grid__item grid__item_main">
                  <UserNewsFeed userId={this.props.user.id} />
                </div>

                <div className="grid__item grid__item_side">
                  <div className="sidebar">
                    {user.iFollow && user.iFollow.length > 0 && (
                      <div className="sidebar__section">
                        <UsersGroup users={user.iFollow} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Promo />
          )}

          <div className="content__inner">
            <Footer />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    user: selectUser(state),
  }),
  dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId)),
  }),
)(HomePage);
