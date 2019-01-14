import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import LayoutBase from '../components/Layout/LayoutBase';
import { fetchPost } from '../actions/posts';
import { getPostById } from '../store/posts';
import { getUserById } from '../store/users';
import { UserCardSimpleWrapper } from '../components/User/UserCardSimple';
import UserFollowButton from '../components/User/UserFollowButton';
import urls from '../utils/urls';
import ButtonEdit from '../components/ButtonEdit';
import { sanitizePostText, checkHashTag, checkMentionTag } from '../utils/text';
import PostRating from '../components/Rating/PostRating';
import Rate from '../components/Rate';
import Comments from '../components/Comments/Comments';
import * as postsUtils from '../utils/posts';
import loader from '../utils/loader';

const PostPage = (props) => {
  const { postId } = props.match.params;

  useEffect(() => {
    loader.start();
    props.dispatch(fetchPost(postId))
      .then(loader.done);
  }, [postId]);

  const post = getPostById(props.posts, postId);

  if (!post || !post.user || !post.user.id) {
    return null;
  }

  const user = getUserById(props.users, post.user.id);

  if (!user) {
    return null;
  }

  post.description = checkHashTag(post.description);
  post.description = checkMentionTag(post.description);

  return (
    <LayoutBase>
      <div className="container">
        <div className="post-head">
          <div className="post-head__inner">
            <div className="post-head__user">
              <UserCardSimpleWrapper userId={user.id} />
            </div>
            <div className="post-head__follow">
              <UserFollowButton userId={user.id} />
            </div>
          </div>
        </div>

        <div className="post-body">
          <div className="post-body__inner">
            <div className="post-body__aside">
              {props.user.id === post.userId &&
                <ButtonEdit url={urls.getPostEditUrl(post.id)} />
              }
            </div>

            <div className="post-body__main">
              <div className="post-body__content">
                <div className="post-content" dangerouslySetInnerHTML={{ __html: sanitizePostText(postsUtils.getPostBody(post)) }} />
              </div>

              <div className="post-body__comments">
                <Comments postId={post.id} />
              </div>
            </div>

            <div className="post-body__bside">
              <div className="post-body__rate">
                <Rate className="rate_medium" value={post.currentRate} />
              </div>
              <div className="post-body__rating">
                <PostRating postId={post.id} />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </LayoutBase>
  );
};

export const getPostPageData = (store, { postId }) =>
  store.dispatch(fetchPost(postId))
    .then(data => ({
      contentMetaTags: postsUtils.getContentMetaTags(data),
    }));

export default connect(state => ({
  user: state.user.data,
  posts: state.posts,
  users: state.users,
}))(PostPage);
