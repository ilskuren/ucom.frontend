import { Route } from 'react-router';
import React, { Fragment } from 'react';
import StoryPage from './Posts/Story';
import Footer from '../components/Footer';

const PostsPage = () => (
  <div className="content">
    <div className="content__inner">
      <Fragment>
        <Route exact path="/posts/:id" component={StoryPage} />
      </Fragment>

      <Footer />
    </div>
  </div>
);

export default PostsPage;
