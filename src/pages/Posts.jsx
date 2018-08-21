import { Route } from 'react-router';
import React, { PureComponent, Fragment } from 'react';
import StoryPage from './Posts/Story';
import Header from '../components/Header';
import Footer from '../components/Footer';

class PostsPage extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <div className="page">
        <Header />

        <div className="content">
          <div className="content__inner">
            <Fragment>
              <Route exact path="/posts/story" component={StoryPage} />
            </Fragment>

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default PostsPage;
