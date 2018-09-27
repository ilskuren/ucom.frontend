import React, { PureComponent } from 'react';
import Post from './Post';
import api from '../api';
import { getFileUrl } from '../utils/upload';
import { getPostUrl, getPostTypeById } from '../utils/posts';

class OrganizationFeed extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.getData(this.props.organizationId);
  }

  componentWillReceiveProps(props) {
    if (+this.props.organizationId !== +props.organizationId) {
      this.getData(props.organizationId);
    }
  }

  getData(organizationId) {
    api.getOrganizationPosts(organizationId)
      .then((data) => {
        this.setState({
          posts: data.data,
        });
      });
  }

  render() {
    return this.state.posts.length > 0 ? (
      <div className="feed">
        <div className="feed__list">
          {this.state.posts.map(item => (
            <div className="feed__item" key={item.id}>
              <Post
                postId={item.id}
                updatedAt={item.updatedAt}
                postType={getPostTypeById(item.postTypeId)}
                rating={item.currentVote}
                title={item.title}
                url={getPostUrl(item.id)}
                leadingText={item.leadingText}
                coverUrl={getFileUrl(item.mainImageFilename)}
                // userName={getUserName(this.state.user)}
                // accountName={this.state.user.accountName}
                // profileLink={getUserUrl(this.state.user.id)}
                // avatarUrl={getFileUrl(this.state.user.avatarFilename)}
              />
            </div>
          ))}
        </div>
      </div>
    ) : null;
  }
}

export default OrganizationFeed;
