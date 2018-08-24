import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import React, { Fragment, PureComponent } from 'react';
import StoryPage from './EditPost/Story';

class EditPost extends PureComponent {
  render() {
    return this.props.user.id ? (
      <div className="create-post" id="post">
        <Fragment>
          <Route path="/posts/edit/:id" component={StoryPage} />
        </Fragment>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default connect(state => ({
  user: state.user,
}), null)(EditPost);
