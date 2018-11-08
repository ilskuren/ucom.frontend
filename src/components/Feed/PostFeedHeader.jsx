import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PostRating from '../Rating/PostRating';
import RepostRating from '../Rating/RepostRating';
import UserCard from '../UserCard';

class PostFeedHeader extends PureComponent {
  render() {
    return (
      <div className="post__header">
        <div className="post__info-block">
          <div className="post__type"><strong>{this.props.postTypeId}</strong></div>
          <div className="toolbar__main">{this.props.updatedAt}</div>
          <div className="toolbar__side">
            <PostRating postId={this.props.postId} />
          </div>
        </div>

        <div className="post__user">
          <UserCard
            sign="@"
            userName={this.props.userName}
            accountName={this.props.accountName}
            profileLink={this.props.profileLink}
            avatarUrl={this.props.avatarUrl}
          />
        </div>
      </div>
    );
  }
}

PostFeedHeader.propTypes = {
  // users: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default PostFeedHeader;
