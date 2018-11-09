import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconComment from '../Icons/Comment';
import IconShare from '../Icons/Share';
import Comments from '../Comments/Comments';
import LastUserComments from '../Comments/LastUserComments';
import ShareBlock from './ShareBlock';
import { createComment } from '../../actions/comments';
import { getPinnedPostUrl } from '../../utils/posts';
import { scrollTo } from '../../utils/scroll';

const POST_TOP_OFFSET = 20;

class PostFeedFooter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      commentsIsVisible: false,
      sharePopup: false,
      timestamp: (new Date()).getTime(),
    };
  }

  componentDidMount() {
    if (this.props.pinned) {
      this.showOnFeed();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.pinned && nextProps.pinned) {
      this.showOnFeed();
    }
  }

  showOnFeed() {
    scrollTo(this.props.el, POST_TOP_OFFSET);
    this.toggleComments();
  }

  toggleComments = () => {
    this.setState({
      timestamp: (new Date()).getTime(),
      commentsIsVisible: !this.state.commentsIsVisible,
    });
  };

  toggleShare = () => {
    this.setState({ sharePopup: !this.state.sharePopup });
  };

  render() {
    const { post } = this.props;

    return (
      <div>
        <div className="post__footer">
          <span
            role="presentation"
            className={classNames(
              'post__comment-count',
              { 'post__comment-count_active': this.state.commentsIsVisible },
            )}
            onClick={this.toggleComments}
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
              'post__share',
              { 'post__share_active': this.state.sharePopup },
            )}
            onClick={this.toggleShare}
          >
            <span className="inline inline_small">
              <span className="inline__item">
                <IconShare />
              </span>
              <span className="inline__item">Share</span>
            </span>
          </span>
          {this.state.sharePopup ? (
            <div className="post__share-popup">
              <ShareBlock
                link={getPinnedPostUrl(post)}
                postId={post.id}
                postTypeId={this.props.postTypeId}
                onClickClose={() => { this.setState({ sharePopup: false }); }}
              />
            </div>
          ) : null }
        </div>

        <div className="post__comments">
          {this.state.commentsIsVisible ? (
            <Comments postId={post.id} />
          ) : (
            <LastUserComments postId={post.id} timestamp={this.state.timestamp} />
          )}
        </div>
      </div>
    );
  }
}

PostFeedFooter.propTypes = {
  commentsCount: PropTypes.number,
  pinned: PropTypes.bool,
  postTypeId: PropTypes.number,
};

export default connect(
  state => ({
    comments: state.comments,
  }),
  dispatch => bindActionCreators({
    createComment,
  }, dispatch),
)(PostFeedFooter);
