import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Footer from '../components/Footer';
import PostsGroupTabs from '../components/PostMedia/PostsGroupTabs';
import UserNewsFeed from '../components/Feed/UserNewsFeed';
import UsersGroup from '../components/PostMedia/UsersGroup';
import Promo from '../components/Promo';
import LayoutBase from '../components/Layout/LayoutBase';
import { selectUser } from '../store/selectors';
import { fetchUser } from '../actions/users';

class HomePage extends PureComponent {
  componentDidMount() {
    if (this.props.user.id) {
      this.props.fetchUser(this.props.user.id);
    }
  }

  render() {
    return (
      <LayoutBase>
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
                    {this.props.user.iFollow && this.props.user.iFollow.length > 0 && (
                      <div className="sidebar__section">
                        <UsersGroup users={this.props.user.iFollow} />
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
      </LayoutBase>
    );
  }
}

HomePage.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: selectUser(state),
  }),
  dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId)),
  }),
)(HomePage);
