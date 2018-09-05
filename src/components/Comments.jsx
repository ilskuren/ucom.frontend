import moment from 'moment';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { getFileUrl } from '../utils/upload';
import { getUserName } from '../utils/user';

class Comments extends PureComponent {
  createComment(description, parent_id) {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit({ description, parent_id });
    }
  }

  render() {
    const comments = sortBy(this.props.comments, i => i.path).reverse();

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
                id={item.id}
                description={item.description}
                avatar={item.User ? getFileUrl(item.User.avatar_filename) : null}
                userName={getUserName(item.User)}
                accountName={item.User ? item.User.account_name : null}
                created={moment(item.created_at).fromNow()}
                onSubmit={description => this.createComment(description)}
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
