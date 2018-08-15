import React from 'react';
import Avatar from './Avatar';

const PostInput = () => (
  <div className="post-input">
    <div className="inline">
      <div className="inline__item">
        Hey
      </div>
      <div className="inline__item">
        <Avatar src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
      </div>
      <div className="inline__item">
        what’s new?
      </div>
    </div>
  </div>
);

export default PostInput;
