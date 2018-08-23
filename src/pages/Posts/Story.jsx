
import React from 'react';
import PostItem from '../../components/PostItem';
import Share from '../../components/Share';

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
      <Share amount="8 923" />
    </div>
  </div>
);

export default StoryPage;
