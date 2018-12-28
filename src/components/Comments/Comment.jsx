import moment from 'moment';
import { Link } from 'react-router-dom';
import humps from 'lodash-humps';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Avatar from '../Avatar';
import CommentRating from '../Rating/CommentRating';
import CommentForm from './CommentForm';
import { getCommentById } from '../../store/comments';
import { selectUser } from '../../store/selectors';
import { getUserUrl, getUserName } from '../../utils/user';
import { getFileUrl } from '../../utils/upload';
import { getOrganizationUrl } from '../../utils/organization';
import { sanitizeCommentText } from '../../utils/text';

class Comment extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  showForm() {
    this.setState({ active: true });
  }

  hideForm() {
    this.setState({ active: false });
  }

  render() {
    const comment = humps(getCommentById(this.props.comments, this.props.id));

    if (!comment || !comment.user) {
      return null;
    }

    const userUrl = getUserUrl(comment.user.id);

    return (
      <div className="comment" depth={comment.depth || 0}>
        <div className="toolbar toolbar_top">
          <div className="toolbar__side">
            <Link to={userUrl}>
              <Avatar
                showBadge={comment.organization}
                badgeTitle={comment.organization && comment.organization.nickname}
                badgeUrl={comment.organization && getFileUrl(comment.organization.avatarFilename)}
                badgeLink={comment.organization && getOrganizationUrl(comment.organization.id)}
                size="xsmall"
                src={getFileUrl(comment.user.avatarFilename)}
              />
            </Link>
          </div>
          <div className="toolbar__main">
            <div className="comment__header">
              <div className="toolbar">
                <div className="toolbar__main">
                  <div className="comment__username">
                    <Link to={userUrl}>{getUserName(comment.user)}</Link>
                  </div>
                  <div className="comment__account">@{comment.user.accountName}</div>
                </div>
                <div className="toolbar__side">
                  <CommentRating commentId={comment.id} />
                </div>
              </div>
            </div>
            <div className="comment__text" dangerouslySetInnerHTML={{ __html: sanitizeCommentText(comment.description) }} />
            <div className="comment__actions">
              <div className="inline">
                {this.props.user.id && (
                  <div className="inline__item">
                    <button className="button-clean button-clean_link" onClick={() => this.showForm()}>
                      <span className="comment__reply">Reply</span>
                    </button>
                  </div>
                )}
                <div className="inline__item">
                  <span className="comment__time">{moment(comment.createdAt).fromNow()}</span>
                </div>
              </div>
            </div>
            {this.state.active && (
              <div className="comment__form">
                <CommentForm
                  active
                  autoFocus
                  onReset={() => this.hideForm()}
                  onSubmit={(description) => {
                    this.props.onSubmit(description);
                    this.hideForm();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  id: PropTypes.number,
  comments: PropTypes.objectOf(PropTypes.object),
  onSubmit: PropTypes.func.isRequired,
};

export default connect(state => ({
  comments: state.comments,
  user: selectUser(state),
}))(Comment);
