
import React from 'react';
import PostItem from '../../components/PostItem';

const StoryPage = () => (
  <div className="posts">
    <div className="posts__content">
      <PostItem
        title="No Country for Old Men, aren't it"
        tag="story"
        rate={9200}
        size="big"
        edit
      />
    </div>
    <div className="posts__sidebar">
      Sidebar
    </div>
  </div>
);

export default StoryPage;
