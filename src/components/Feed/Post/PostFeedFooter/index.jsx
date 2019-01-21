import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconComment from '../../../Icons/Comment';
import IconShare from '../../../Icons/Share';
import Comments from '../../../Comments/Comments';
import LastUserComments from '../../../Comments/LastUserComments';
import ShareBlock from '../ShareBlock';
import { createComment } from '../../../../actions/comments';
import urls from '../../../../utils/urls';
import styles from './PostFeedFooter.css';
import PostRating from '../../../Rating/PostRating';

class PostFeedFooter extends PureComponent {
  render() {
    const { post } = this.props;

    return (
      <div>
        <div className={styles.footer}>
          <div>
            <span
              role="presentation"
              className={classNames(
                `${styles.commentСount}`,
                { [styles.commentCountActive]: this.props.commentsIsVisible },
              )}
              onClick={this.props.toggleComments}
            >
              <span className="inline inline_small">
                <span className="inline__item">
                  <IconComment />
                </span>
                <span className="inline__item">{this.props.commentsCount}</span>
              </span>
            </span>
            <span
              role="presentation"
              className={classNames(
                `${styles.share}`,
                { [styles.shareActive]: this.props.sharePopup },
              )}
              onClick={this.props.toggleShare}
            >
              <span className="inline inline_small">
                <span className="inline__item">
                  <IconShare />
                </span>
                <span className="inline__item">Share</span>
              </span>
            </span>
            {this.props.sharePopup ? (
              <div className="post__share-popup">
                <ShareBlock
                  link={urls.getPostUrl(post)}
                  postId={post.id}
                  onClickClose={this.props.toggleShare}
                  repostAvailable={post.myselfData.repostAvailable}
                />
              </div>
            ) : null }
          </div>
          <div>
            <PostRating postId={post.id} />
          </div>
        </div>

        <div className="post__comments">
          {this.props.commentsIsVisible ? (
            <Comments postId={post.id} />
          ) : (
            <LastUserComments postId={post.id} timestamp={this.props.timestamp} />
          )}
        </div>
      </div>
    );
  }
}

PostFeedFooter.propTypes = {
  commentsCount: PropTypes.number,
};

export default connect(
  state => ({
    comments: state.comments,
  }),
  dispatch => bindActionCreators({
    createComment,
  }, dispatch),
)(PostFeedFooter);
