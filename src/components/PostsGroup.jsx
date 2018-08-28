import PropTypes from 'prop-types';
import React from 'react';
import PostCard from './PostCard';
import PostItem from './PostItem';
import { getPostUrl } from '../utils/posts';
import { getFileUrl } from '../utils/upload';

const PostsGroup = (props) => {
  const { posts } = props;
  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 5);
  const footerPosts = posts.slice(6, 9);

  return (
    <div className="post-group">
      <div className="post-group__item">
        <div className="grid grid_main-post">
          <div className="grid__item">
            <PostCard
              post={mainPost}
            />
          </div>

          {sidePosts.map(post => (
            <div className="grid__item" key={post.id}>
              <PostItem
                title={post.title}
                rate={post.current_rate}
                url={getPostUrl(post.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="post-group__item">
        <div className="grid">
          {footerPosts.map(post => (
            <div className="grid__item" key={post.id}>
              <PostItem
                title={post.title}
                rate={post.current_rate}
                url={getPostUrl(post.id)}
                coverImg={getFileUrl(post.main_image_filename)}
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
