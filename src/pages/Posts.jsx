import { Route } from 'react-router';
import React, { Fragment } from 'react';
import StoryPage from './Posts/Story';
import Footer from '../components/Footer';

const PostsPage = () => (
  <div className="content">
    <div className="sheets">
      <div className="sheets__list">
        <div className="sheets__item">
          User
        </div>
      </div>

      <div className="sheets__content sheets__content_posts">
        <Fragment>
          <Route exact path="/posts/story/:id" component={StoryPage} />
        </Fragment>

        <Footer />
      </div>
    </div>
  </div>
);

export default PostsPage;
