import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
// import FeedToolbar from './FeedToolbar';
import Post from './Post';
// import PostInput from './PostInput';
import { getUserName, getUserUrl } from '../utils/user';
import { getFileUrl } from '../utils/upload';
import { getPostUrl, getPostTypeById } from '../utils/posts';
import api from '../api';
import { selectUser } from '../store/selectors';

class Feed extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      user: {},
    };
  }

  componentDidMount() {
    this.getData(this.props.userId);
  }

  componentWillReceiveProps(props) {
    if (+this.props.userId !== +props.userId) {
      this.getData(props.userId);
    }
  }

  getData(userId) {
    Promise.all([
      api.getUserPosts(userId),
      api.getUser(userId),
    ])
      .then((result) => {
        this.setState({
          posts: result[0],
          user: result[1],
        });
      });
  }

  render() {
    return (
      <div className="feed">
        <div className="feed__title">
          <h1 className="title title_small">{this.props.title}</h1>
        </div>

        {/* {this.props.user.id && this.state.user && this.state.user.id === this.props.user.id && (
          <div className="feed__post-form">
            <PostInput />
          </div>
        )} */}

        {/* <div className="feed__toolbar">
          <FeedToolbar />
        </div> */}

        {this.state.posts.length > 0 && (
          <div className="feed__list">
            {this.state.posts.map(item => (
              <div className="feed__item" key={item.id}>
                <Post
                  postId={item.id}
                  updatedAt={item.updatedAt}
                  postType={getPostTypeById(item.postTypeId)}
                  rating={item.currentVote}
                  userName={getUserName(this.state.user)}
                  accountName={this.state.user.accountName}
                  profileLink={getUserUrl(this.state.user.id)}
                  avatarUrl={getFileUrl(this.state.user.avatarFilename)}
                  title={item.title}
                  url={getPostUrl(item.id)}
                  leadingText={item.leadingText}
                  coverUrl={getFileUrl(item.mainImageFilename)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Feed.propTypes = {
  title: PropTypes.string,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Feed.defaultProps = {
  title: 'Ur News Feed',
};

export default connect(state => ({
  user: selectUser(state),
}))(Feed);
