import { connect } from 'react-redux';
import { Route } from 'react-router';
import React, { Fragment } from 'react';
import StoryPage from './Posts/Story';
import Footer from '../components/Footer';
import PostHeader from '../components/PostHeader';
import { getFileUrl } from '../utils/upload';
import { getUserName } from '../utils/user';

const PostsPage = props => (
  <div className="content">
    <div className="content__inner">
      <div className="sheets">
        <div className="sheets__list">
          <div className="sheets__item">
            <PostHeader avatar={getFileUrl(props.user.avatar_filename)} name={getUserName(props.user)} rating="40 000" />
          </div>
        </div>

        <div className="sheets__content sheets__content_posts">
          <Fragment>
            <Route exact path="/posts/story/:id" component={StoryPage} />
          </Fragment>
        </div>
      </div>

      <Footer />
    </div>
  </div>
);

export default connect(state => ({
  user: state.user,
}), null)(PostsPage);
