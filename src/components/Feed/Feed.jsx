import { uniqBy } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import Post from './Post/Post';
import LoadMore from './LoadMore';
import FeedInput from './FeedInput';
import { getPostById } from '../../store/posts';
import { fetchPost, createUserCommentPost, createSelfCommentPost, createOrganizationsCommentPost } from '../../actions/posts';
import { USER_NEWS_FEED_ID, USER_WALL_FEED_ID, ORG_FEED_ID } from '../../utils/feed';

class Feed extends PureComponent {
  componentDidMount() {
    this.getData(this.props.pinnedPostId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pinnedPostId !== nextProps.pinnedPostId) {
      this.getData(nextProps.pinnedPostId);
    }
  }

  getData(pinnedPostId) {
    if (pinnedPostId) {
      this.props.fetchPost(pinnedPostId);
    }
  }

  render() {
    const pinnedPost = getPostById(this.props.posts, this.props.pinnedPostId);
    let posts = this.props.postsIds.map(id => getPostById(this.props.posts, id))
      .filter(item => !!item)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (pinnedPost) {
      posts = [pinnedPost].concat(posts);
    }

    posts = uniqBy(posts, item => item.id);

    const createDirectPost = (description, main_image_filename) => {
      let fn;

      switch (this.props.typeFeed) {
        case (USER_NEWS_FEED_ID):
          fn = this.props.createUserCommentPost;
          console.log('yep im here');
          break;
        case (USER_WALL_FEED_ID):
          fn = this.props.createSelfCommentPost;
          console.log('yep im here too');
          break;
        case (ORG_FEED_ID):
          fn = this.props.createOrganizationsCommentPost;
          break;
        default:
          break;
      }
      fn({
        organizationId: this.props.organizationId ? this.props.organizationId : null,
        userId: this.props.userId,
        data: {
          post_type_id: 10,
          description,
          main_image_filename,
        },
      });
    };

    return (
      <div className="feed">
        {this.props.title &&
          <div className="feed__title">
            <h1 className="title title_small">{this.props.title}</h1>
          </div>
        }

        <FeedInput
          onSubmit={createDirectPost}
        />

        {posts.length > 0 && (
          <Fragment>
            <div className="feed__list">
              {posts.map(item => (
                <div className="feed__item" key={item.id}>
                  <Post
                    ref={(el) => { this.el = el; }}
                    id={item.id}
                    postTypeId={item.postTypeId}
                    pinned={+this.props.pinnedPostId === +item.id}
                  />
                </div>
              ))}
            </div>
            {this.props.loadMoreIsVisible && (
              <div className="feed__loadmore">
                <LoadMore
                  onClick={() => {
                    if (!this.props.feeds.loading && typeof this.props.onClickMore === 'function') {
                      this.props.onClickMore();
                    }
                  }}
                />
              </div>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

Feed.propTypes = {
  title: PropTypes.string,
  createUserCommentPost: PropTypes.func,
  pinnedPostId: PropTypes.number,
  postsIds: PropTypes.arrayOf(PropTypes.number),
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
  onClickMore: PropTypes.func,
  loadMoreIsVisible: PropTypes.bool,
  feeds: PropTypes.objectOf(PropTypes.any),
  fetchPost: PropTypes.func.isRequired,
};

Feed.defaultProps = {
  postsIds: [],
};

export default connect(
  state => ({
    posts: state.posts,
    feeds: state.feeds,
  }),
  dispatch => bindActionCreators({
    fetchPost,
    createUserCommentPost,
    createSelfCommentPost,
    createOrganizationsCommentPost,
  }, dispatch),
)(Feed);
