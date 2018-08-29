import PropTypes from 'prop-types';
import React from 'react';
import PostCard from './PostCard';
import PostItem from './PostItem';
import { getPostUrl } from '../utils/posts';
import { getFileUrl } from '../utils/upload';
import { getUserUrl } from '../utils/user';

const PostsGroup = (props) => {
  const { posts } = props;
  const mainPost = posts.length ? posts[0] : {};
  const sidePosts = posts.length ? posts.slice(1, 5) : [{}, {}, {}, {}];
  const footerPosts = posts.length ? posts.slice(6, 9) : [{}, {}, {}];

  return (
    <div className="post-group">
      <div className="post-group__item">
        <div className="grid grid_main-post">
          <div className="grid__item">
            <PostCard
              coverUrl={getFileUrl(mainPost.main_image_filename)}
              rate={mainPost.current_rate}
              title={mainPost.title}
              url={getPostUrl(mainPost.id)}
              userUrl={getUserUrl(mainPost.User && mainPost.User.id)}
              userImageUrl={getFileUrl(mainPost.User && mainPost.User.avatar_filename)}
              tags={mainPost.id ? ['story'] : null}
            />
          </div>

          {sidePosts.map((post, index) => (
            <div className="grid__item" key={post.id || index}>
              <PostItem
                title={post.title}
                rate={post.current_rate}
                url={getPostUrl(post.id)}
                tags={post.id ? ['story'] : null}
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
                rate={post.current_rate}
                url={getPostUrl(post.id)}
                coverImg={getFileUrl(post.main_image_filename)}
                tags={post.id ? ['story'] : null}
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
