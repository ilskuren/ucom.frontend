import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserFeed from '../components/Feed/UserFeed';
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

const UserPage = (props) => {
  const userId = Number(props.match.params.id);
  const postId = Number(props.match.params.postId);

  useEffect(() => {
    props.fetchUser(userId);
  }, [userId]);

  useEffect(() => {
    if (postId) {
      props.fetchPost(postId);
    }
  }, [postId]);

  const user = getUserById(props.users, userId);
  const post = getPostById(props.posts, postId);

  // console.log('state', props.users);
  // console.log('user', user);

  if (!user) {
    return null;
  }

  return (
    <LayoutBase>
      {Boolean(post) &&
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
              <UserFeed userId={userId} />
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

export default connect(
  state => ({
    users: state.users,
    posts: state.posts,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    fetchUser,
    fetchPost,
  }, dispatch),
)(UserPage);
