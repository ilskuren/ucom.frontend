import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import PostsGroupTabs from '../components/PostMedia/PostsGroupTabs';
import Promo from '../components/Promo';
import LayoutBase from '../components/Layout/LayoutBase';
import { selectUser } from '../store/selectors';
import { fetchUser } from '../actions/users';
import UserPeoples from '../components/User/UserPeoples';
import UserOrganizations from '../components/User/UserOrganizations';
import { getUserById } from '../store/users';
import Feed from '../components/Feed/Feed';
import { USER_NEWS_FEED_ID } from '../utils/feed';

const HomePage = (props) => {
  useEffect(() => {
    if (props.user.id) {
      props.fetchUser(props.user.id);
    }
  }, []);

  const user = getUserById(props.users, props.user.id);

  return (
    <LayoutBase>
      <div className="content">
        <div className="content__inner">
          <PostsGroupTabs />
        </div>
      </div>

      <div className="content content_shadows">
        {user ? (
          <div className="content__inner">
            <div className="grid grid_content">
              <div className="grid__item grid__item_main">
                <Feed userId={user.id} feedTypeId={USER_NEWS_FEED_ID} />
              </div>

              <div className="grid__item grid__item_side">
                <div className="sidebar">
                  <UserPeoples userId={user.id} />
                  <UserOrganizations userId={user.id} />
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
};

HomePage.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: selectUser(state),
    users: state.users,
  }),
  dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId)),
  }),
)(HomePage);
