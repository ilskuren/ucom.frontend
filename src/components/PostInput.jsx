import React from 'react';
import Avatar from './Avatar';

const PostInput = () => (
  <div className="post-input">
    <div className="inline">
      <div className="inline__item">
        Hey
      </div>
      <div className="inline__item">
        <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
      </div>
      <div className="inline__item">
        what’s new?
      </div>
    </div>
  </div>
);

export default PostInput;
