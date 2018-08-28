import React from 'react';
import PostCardBlank from './PostCardBlank';
import PostItemBlank from './PostItemBlank';

const PostGroupBlank = () => (
  <div className="post-group">
    <div className="post-group">
      <div className="post-group__item">
        <div className="grid grid_main-post">
          <div className="grid__item">
            <PostCardBlank />
          </div>

          {[1, 2, 3, 4].map(i => (
            <div className="grid__item" key={i}>
              <PostItemBlank />
            </div>
          ))}
        </div>
      </div>

      <div className="post-group__item">
        <div className="grid">
          {[1, 2, 3].map(i => (
            <div className="grid__item" key={i}>
              <PostItemBlank />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PostGroupBlank;
