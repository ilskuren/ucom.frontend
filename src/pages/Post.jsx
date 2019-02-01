import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import LayoutBase from '../components/Layout/LayoutBase';
import { postsFetch } from '../actions/posts';
import { getPostById } from '../store/posts';
import { getUserById } from '../store/users';
import UserCard from '../components/UserCard/UserCard';
import UserFollowButton from '../components/User/UserFollowButton';
import urls from '../utils/urls';
import ButtonEdit from '../components/ButtonEdit';
import { sanitizePostText, checkHashTag, checkMentionTag } from '../utils/text';
import PostRating from '../components/Rating/PostRating';
import Rate from '../components/Rate';
import Comments from '../components/Comments/wrapper';
import { getPostBody, getContentMetaTags } from '../utils/posts';
import loader from '../utils/loader';
import { COMMENTS_CONTAINER_ID_POST } from '../utils/comments';
import { commentsResetContainerDataByEntryId } from '../actions/comments';
import ShareButton from '../components/ShareButton';
import ShareBlock from '../components/ShareBlock';

const PostPage = (props) => {
  const { postId } = props.match.params;
  const [sharePopup, toggleSharePopup] = useState(false);

  const toggleShare = () => {
    toggleSharePopup(!sharePopup);
  };

  useEffect(() => {
    loader.start();
    props.commentsResetContainerDataByEntryId({
      entryId: postId,
      containerId: COMMENTS_CONTAINER_ID_POST,
    });
    props.postsFetch({ postId })
      .then(loader.done);
  }, [postId]);

  if (!props.post || !props.postAuthor) {
    return null;
  }

  return (
    <LayoutBase>
      <div className="container">
        <div className="post-head">
          <div className="post-head__inner">
            <div className="post-head__user">
              <UserCard userId={props.postAuthor.id} />
            </div>
            <div className="post-head__follow">
              <UserFollowButton userId={props.postAuthor.id} />
            </div>
          </div>
        </div>

        <div className="post-body">
          <div className="post-body__inner">
            <div className="post-body__aside">
              {props.user.id === props.post.userId &&
                <ButtonEdit url={urls.getPostEditUrl(props.post.id)} />
              }
            </div>

            <div className="post-body__main">
              <div className="post-body__content">
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{
                    __html: sanitizePostText(checkMentionTag(checkHashTag(getPostBody(props.post)))),
                  }}
                />
              </div>

              <div className="post-body__comments">
                <Comments postId={props.post.id} containerId={COMMENTS_CONTAINER_ID_POST} />
              </div>
            </div>

            <div className="post-body__bside">
              <div className="post-body__rate">
                <Rate className="rate_medium" value={props.post.currentRate} />
              </div>
              <div className="post-body__rating">
                <PostRating postId={props.post.id} />
              </div>
              <div className="post-body__share">
                <ShareButton
                  toggleShare={toggleShare}
                />
                {sharePopup ? (
                  <div className="post-body__share-popup">
                    <ShareBlock
                      link={urls.getPostUrl(props.post)}
                      postId={props.post.id}
                      onClickClose={toggleShare}
                      repostAvailable={props.post.myselfData.repostAvailable}
                    />
                  </div>
                ) : null }
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </LayoutBase>
  );
};

PostPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string,
    }),
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
  post: PropTypes.objectOf(PropTypes.any),
  postAuthor: PropTypes.objectOf(PropTypes.any),
  postsFetch: PropTypes.func.isRequired,
  commentsResetContainerDataByEntryId: PropTypes.func.isRequired,
};

PostPage.defaultProps = {
  user: {},
  post: null,
  postAuthor: null,
};

export default connect(
  (state, props) => {
    const post = getPostById(state.posts, props.match.params.postId);
    const postAuthor = post ? getUserById(state.users, post.user.id) : null;

    return ({
      user: state.user.data,
      post,
      postAuthor,
    });
  },
  dispatch => bindActionCreators({
    postsFetch,
    commentsResetContainerDataByEntryId,
  }, dispatch),
)(PostPage);

export const getPostPageData = async (store, { postId }) => {
  try {
    const data = await store.dispatch(postsFetch({ postId }));
    return ({
      contentMetaTags: getContentMetaTags(data),
    });
  } catch (e) {
    throw e;
  }
};
