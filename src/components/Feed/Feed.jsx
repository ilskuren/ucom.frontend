import { uniqBy } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import Post from './Post';
import LoadMore from './LoadMore';
import FeedInput from './FeedInput';
import { getPostById } from '../../store/posts';
import { fetchPost } from '../../actions/posts';

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

    return (
      <div className="feed">
        <div className="feed__title">
          <h1 className="title title_small">{this.props.title}</h1>
        </div>

        <FeedInput
          onSubmit={(message) => {
            if (typeof this.props.onSubmitNewPost === 'function') {
              this.props.onSubmitNewPost(message);
            }
          }}
        />

        {posts.length > 0 && (
          <Fragment>
            <div className="feed__list">
              {posts.map(item => (
                <div className="feed__item" key={item.id}>
                  <Post
                    id={item.id}
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
  onSubmitNewPost: PropTypes.func,
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
  title: 'Ur News Feed',
};

export default connect(
  state => ({
    posts: state.posts,
    feeds: state.feeds,
  }),
  dispatch => bindActionCreators({
    fetchPost,
  }, dispatch),
)(Feed);
