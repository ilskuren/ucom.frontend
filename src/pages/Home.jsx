import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import PostsGroupMain from '../components/PostMedia/PostsGroupMain';
import Promo from '../components/Promo';
import LayoutBase from '../components/Layout/LayoutBase';
import { selectUser } from '../store/selectors';
import { fetchUser } from '../actions/users';
import UserPeoples from '../components/User/UserPeoples';
import UserOrganizations from '../components/User/UserOrganizations';
import { getUserById } from '../store/users';
import Feed from '../components/Feed/FeedUser';
import { USER_NEWS_FEED_ID } from '../utils/feed';
import { getMainPostGroupData } from '../actions/mainPostGroup';

const HomePage = (props) => {
  useEffect(() => {
    if (props.user.id) {
      props.dispatch(fetchUser(props.user.id));
    }

    props.dispatch(getMainPostGroupData());
  }, []);

  const user = getUserById(props.users, props.user.id);

  return (
    <LayoutBase>
      <div className="content">
        <div className="content__inner">
          <PostsGroupMain />
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
                <div className="sidebar sidebar_main">
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

export const getHomePageData = store =>
  store.dispatch(getMainPostGroupData());

export default connect(
  state => ({
    user: selectUser(state),
    users: state.users,
  }),
  null,
)(HomePage);
