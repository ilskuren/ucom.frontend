import React from 'react';
import TextEditor from '../../components/TextEditor';


const PostStoryPage = () => (
  <div className="page">
    <div className="content">
      <div className="content__inner_flex">
        <div className="post">
          <TextEditor />
        </div>
      </div>
    </div>
  </div>
);

export default PostStoryPage;
