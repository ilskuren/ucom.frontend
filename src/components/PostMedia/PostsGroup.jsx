import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import PostCard from './PostCard';
import PostItem from '../PostItem';
import { getPostUrl, getPostTypeById } from '../../utils/posts';
import { getFileUrl } from '../../utils/upload';
import { getUserUrl, getUserName } from '../../utils/user';
import api from '../../api';

class PostsGroup extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.getData(this.props.postTypeId);
  }

  componentWillReceiveProps(props) {
    if (this.props.postTypeId !== props.postTypeId) {
      this.getData(props.postTypeId);
    }
  }

  getData(postTypeId) {
    const params = {
      post_type_id: postTypeId,
      sort_by: '-current_rate',
    };

    this.setState({ posts: [] }, () => {
      api.getPosts(params)
        .then((data) => {
          this.setState({
            posts: data.data,
          });
        });
    });
  }

  render() {
    let { posts } = this.state;

    posts = posts.filter(item => item.title || item.leadingText);
    const randomIndex = Math.floor(Math.random() * 10);
    const mainPost = posts.length ? posts[randomIndex] : {};
    posts.splice(randomIndex - 1, 1);
    const sidePosts = posts.length ? posts.slice(1, 5) : [{}, {}, {}, {}];
    const footerPosts = posts.length ? posts.slice(6, 9) : [{}, {}, {}];

    return (
      <div className="post-group">
        <div className="post-group__item">
          <div className="grid grid_main-post">
            <div className="grid__item">
              <PostCard
                coverUrl={getFileUrl(mainPost.mainImageFilename)}
                rate={mainPost.currentRate}
                title={mainPost.title || mainPost.leadingText}
                url={getPostUrl(mainPost.id)}
                userUrl={getUserUrl(mainPost.user && mainPost.user.id)}
                userImageUrl={getFileUrl(mainPost.user && mainPost.user.avatarFilename)}
                userName={getUserName(mainPost.user)}
                accountName={mainPost.user && mainPost.user.accountName}
                tags={mainPost.postTypeId && [getPostTypeById(mainPost.postTypeId)]}
                commentsCount={mainPost.postTypeId && mainPost.commentsCount}
                sharesCount={mainPost.postTypeId && mainPost.sharesCount}
                userRate={mainPost.user && mainPost.user.currentRate}
              />
            </div>

            {sidePosts.map((post, index) => (
              <div className="grid__item" key={post.id || index}>
                <PostItem
                  title={post.title}
                  rate={post.currentRate}
                  url={getPostUrl(post.id)}
                  tags={[getPostTypeById(post.postTypeId)]}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="post-group__item">
          <div className="grid">
            {footerPosts.map((post, index) => (
              <div className="grid__item" key={post.id || index}>
                <PostItem
                  title={post.title}
                  rate={post.currentRate}
                  url={getPostUrl(post.id)}
                  coverImg={getFileUrl(post.mainImageFilename)}
                  tags={[getPostTypeById(post.postTypeId)]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

PostsGroup.propTypes = {
  postTypeId: PropTypes.number,
};

export default PostsGroup;
