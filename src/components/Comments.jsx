import humps from 'lodash-humps';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { getFileUrl } from '../utils/upload';
import { getUserName, getUserUrl } from '../utils/user';
import { sortComments } from '../utils/comments';
import { selectUser } from '../store/selectors';
import { getOrganizationUrl } from '../utils/organization';

class Comments extends PureComponent {
  createComment(description, commentId) {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit({ description }, commentId);
    }
  }

  render() {
    const comments = humps(sortComments(this.props.comments));
    const organization = humps(this.props.organization);

    return (
      <div className="comments">
        <div className="comments__form">
          <CommentForm
            showAvatrBadge={this.props.organizationMember}
            avatarBadgeUrl={organization && getFileUrl(organization.avatarFilename)}
            avatarBadgeTitle={organization && organization.title}
            onSubmit={description => this.createComment(description)}
          />
        </div>

        {comments && comments.length > 0 && (
          <div className="comments__list">
            {comments.map(item => (
              <Comment
                key={item.id}
                id={item.id}
                depth={item.depth}
                choice={item.myselfData && item.myselfData.myselfVote}
                rating={item.currentVote}
                postId={this.props.postId}
                description={item.description}
                avatar={item.user ? getFileUrl(item.user.avatarFilename) : null}
                userName={getUserName(item.user)}
                userUrl={getUserUrl(item.user.id)}
                accountName={item.user ? item.user.accountName : null}
                created={moment(item.createdAt).fromNow()}
                onSubmit={description => this.createComment(description, item.id)}
                showAvatrBadge={item.organization}
                avatarBadgeUrl={item.organization && getFileUrl(item.organization.avatarFilename)}
                avatarBadgeTitle={item.organization && item.organization.title}
                avatarBadgeLink={item.organization && getOrganizationUrl(item.organization.id)}
                showFormAvatrBadge={this.props.organizationMember}
                formAvatarBadgeUrl={organization && getFileUrl(organization.avatarFilename)}
                formAvatarBadgeTitle={organization && organization.title}
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
  postId: PropTypes.number,
};

export default connect(state => ({
  user: selectUser(state),
}))(Comments);
