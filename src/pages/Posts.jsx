import { Route } from 'react-router';
import React, { Fragment } from 'react';
import StoryPage from './Posts/Story';
import OfferPage from './Posts/Offer';
import Footer from '../components/Footer';

const PostsPage = () => (
  <div className="content">
    <div className="content__inner">
      <Fragment>
        <Route exact path="/posts/story/:id" component={StoryPage} />
        <Route exact path="/posts/offer/:id" component={OfferPage} />
      </Fragment>

      <Footer />
    </div>
  </div>
);

export default PostsPage;
