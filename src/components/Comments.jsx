import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';

class Comments extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="comments">
        {this.props.user.id && (
          <div className="comments__form">
            <CommentForm />
          </div>
        )}

        <div className="comments__list">
          <Comment />
          <Comment />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  user: state.user,
}))(Comments);
