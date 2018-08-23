import { Route } from 'react-router';
import React, { Fragment } from 'react';
import StoryPage from './Posts/Story';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostHeader from '../components/PostHeader';
import HordeIco from '../static/img/horde_ico.png';

const PostsPage = () => (
  <div className="page">
    <Header />

    <div className="sheets">
      <div className="sheets__list">
        <div className="sheets__item">
          <PostHeader avatar={HordeIco} name="Kirill Elizarov" rating="40 000" />
        </div>
      </div>

      <div className="sheets__content">
        <Fragment>
          <Route exact path="/posts/story/:id" component={StoryPage} />
        </Fragment>

        <Footer />
      </div>
    </div>
  </div>
);

export default PostsPage;
