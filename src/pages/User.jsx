import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserHead from '../components/User/UserHead';
import UserOrganizations from '../components/User/UserOrganizations';
import UserAbout from '../components/User/UserAbout';
import UserSocialNetworks from '../components/User/UserSocialNetworks';
import UserNetworks from '../components/User/UserNetworks';
import UserCreatedAt from '../components/User/UserCreatedAt';
import LayoutBase from '../components/Layout/LayoutBase';
import { selectUser } from '../store/selectors/user';
import { fetchUser } from '../actions/users';
import { fetchPost } from '../actions/posts';
import { getUserById } from '../store/users';
import { getPostById } from '../store/posts';
import Popup from '../components/Popup';
import ModalContent from '../components/ModalContent';
import Post from '../components/Feed/Post/Post';
import urls from '../utils/urls';
import Feed from '../components/Feed/FeedUser';
import { USER_WALL_FEED_ID, FEED_PER_PAGE } from '../utils/feed';
import { feedGetUserPosts } from '../actions/feed';

const UserPage = (props) => {
  const userId = Number(props.match.params.userId);
  const postId = Number(props.match.params.postId);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.dispatch(fetchUser(userId));
  }, [userId]);

  useEffect(() => {
    if (postId) {
      props.dispatch(fetchPost(postId));
    }
  }, [postId]);

  const user = getUserById(props.users, userId);
  const post = getPostById(props.posts, postId);

  if (!user) {
    return null;
  }

  return (
    <LayoutBase>
      {post &&
        <Popup onClickClose={() => props.history.push(urls.getUserUrl(userId))}>
          <ModalContent mod="post">
            <Post id={post.id} postTypeId={post.postTypeId} />
          </ModalContent>
        </Popup>
      }

      <div className="content content_sheet">
        <div className="content__inner">
          <UserHead userId={userId} />

          <div className="grid grid_user">
            <div className="grid__item">
              <UserAbout userId={userId} />
              <Feed
                userId={userId}
                feedTypeId={USER_WALL_FEED_ID}
              />
            </div>

            <div className="grid__item">
              <UserOrganizations userId={userId} />
              <UserSocialNetworks userId={userId} />
              <UserNetworks userId={userId} />
              <UserCreatedAt userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export const getUserPageData = (store, params) => {
  const userPromise = store.dispatch(fetchUser(params.userId));
  const postPromise = params.postId ? store.dispatch(fetchPost(params.postId)) : null;
  const feedPromise = store.dispatch(feedGetUserPosts(USER_WALL_FEED_ID, {
    page: 1,
    perPage: FEED_PER_PAGE,
    userId: params.userId,
  }));

  return Promise.all([userPromise, postPromise, feedPromise]);
};

export default connect(state => ({
  users: state.users,
  posts: state.posts,
  user: selectUser(state),
}))(UserPage);
