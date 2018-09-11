import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { getFileUrl } from '../utils/upload';
import { getUserName, getUserUrl } from '../utils/user';

class Comments extends PureComponent {
  createComment(description, commentId) {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit({ description }, commentId);
    }
  }

  render() {
    const comments = (this.props.comments || []).sort((commentA, commentB) => { // eslint-disable-line
      const a = commentA.path;
      const b = commentB.path;

      const iterationAmount = a.length > b.length ? a.length : b.length;

      for (let i = 0; i < iterationAmount; i++) {
        if (b[i] === undefined) return 1;
        if (a[i] === undefined) return -1;
        if (a[i] !== b[i]) return a[i] - b[i];
      }
    });

    return (
      <div className="comments">
        {this.props.user.id && (
          <div className="comments__form">
            <CommentForm
              onSubmit={description => this.createComment(description)}
            />
          </div>
        )}

        {comments.length > 0 && (
          <div className="comments__list">
            {comments.map(item => (
              <Comment
                key={item.id}
                id={item.id}
                description={item.description}
                avatar={item.User ? getFileUrl(item.User.avatar_filename) : null}
                userName={getUserName(item.User)}
                userUrl={getUserUrl(item.User.id)}
                accountName={item.User ? item.User.account_name : null}
                created={moment(item.created_at).fromNow()}
                depth={item.depth}
                onSubmit={description => this.createComment(description, item.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

Comments.propTypes = {
  onSubmit: PropTypes.func,
  comments: PropTypes.arrayOf(PropTypes.object),
};

export default connect(state => ({
  user: state.user,
}))(Comments);
