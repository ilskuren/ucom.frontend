import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostHeader from '../components/Post/PostHeader';
import PostContent from '../components/Post/PostContent';
import Footer from '../components/Footer';
import LayoutBase from '../components/Layout/LayoutBase';
import { fetchPost } from '../actions/posts';
import { getPostById } from '../store/posts';
import { getUserById } from '../store/users';
import { UserCardSimpleWrapper } from '../components/User/UserCardSimple';
import UserFollowButton from '../components/User/UserFollowButton';

const Post = (props) => {
  useEffect(() => {
    props.fetchPost(props.match.params.id);
  }, [props.match.params.id]);

  const post = getPostById(props.posts, props.match.params.id);

  if (!post || !post.user || !post.user.id) {
    return null;
  }

  const user = getUserById(props.users, post.user.id);

  if (!user) {
    return null;
  }

  return (
    <LayoutBase>
      <div className="post-page">
        <div className="post-page-header">
          <div className="post-page-header__section post-page-header__section_user-card">
            <UserCardSimpleWrapper userId={user.id} />
          </div>
          <div className="post-page-header__section post-page-header__section_follow-button">
            <UserFollowButton userId={user.id} />
          </div>
        </div>
      </div>

      {/* <div className="content-wrapper">
        <div className="content">
          <div className="content__inner">
            <div className="sheets">
              <div className="sheets__list">
                <div className="sheets__item">
                  <PostHeader postId={Number(props.match.params.id)} />
                </div>
              </div>

              <div className="sheets__content sheets__content_posts">
                <PostContent postId={Number(props.match.params.id)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="content__inner">
          <Footer />
        </div>
      </div> */}
    </LayoutBase>
  );
};

Post.propTypes = {
  fetchPost: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    posts: state.posts,
    users: state.users,
  }),
  dispatch => bindActionCreators({
    fetchPost,
  }, dispatch),
)(Post);
