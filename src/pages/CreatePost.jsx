import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import React, { Fragment, PureComponent } from 'react';
import StoryPage from './Posts/Story';

class CreatePost extends PureComponent {
  render() {
    return this.props.user.id ? (
      <div className="create-post">
        <Fragment>
          <Route exact path="/posts/new/story" component={StoryPage} />
        </Fragment>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default connect(state => ({
  user: state.user,
}), null)(CreatePost);
