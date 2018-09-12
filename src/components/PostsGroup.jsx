import PropTypes from 'prop-types';
import React from 'react';
import PostCard from './PostCard';
import PostItem from './PostItem';
import { getPostUrl, getPostTypeById } from '../utils/posts';
import { getFileUrl } from '../utils/upload';
import { getUserUrl, getUserName } from '../utils/user';

const PostsGroup = (props) => {
  let { posts } = props;

  posts = posts.filter(p => p.title && p.description);

  const mainPost = posts.length ? posts[0] : {};
  const sidePosts = posts.length ? posts.slice(1, 5) : [{}, {}, {}, {}];
  const footerPosts = posts.length ? posts.slice(6, 9) : [{}, {}, {}];

  return (
    <div className="post-group">
      <div className="post-group__item">
        <div className="grid grid_main-post">
          <div className="grid__item">
            <PostCard
              coverUrl={getFileUrl(mainPost.mainImageFilename)}
              rate={mainPost.currentRate}
              title={mainPost.title}
              url={getPostUrl(mainPost.id)}
              userUrl={getUserUrl(mainPost.user && mainPost.user.id)}
              userImageUrl={getFileUrl(mainPost.user && mainPost.user.avatarFilename)}
              userName={getUserName(mainPost.user)}
              accountName={mainPost.user && mainPost.user.accountName}
              tags={[getPostTypeById(mainPost.postTypeId)]}
              commentsCount={mainPost.commentsCount}
            />
          </div>

          {sidePosts.map((post, index) => (
            <div className="grid__item" key={post.id || index}>
              <PostItem
                title={post.title}
                rate={post.currentRate}
                url={getPostUrl(post.id)}
                tags={[getPostTypeById(post.postTypeId)]}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="post-group__item">
        <div className="grid">
          {footerPosts.map((post, index) => (
            <div className="grid__item" key={post.id || index}>
              <PostItem
                title={post.title}
                rate={post.currentRate}
                url={getPostUrl(post.id)}
                coverImg={getFileUrl(post.mainImageFilename)}
                tags={[getPostTypeById(post.postTypeId)]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

PostsGroup.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.any),
};

export default PostsGroup;
