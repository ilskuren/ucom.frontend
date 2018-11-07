import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PostRating from '../Rating/PostRating';
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


        {this.props.userName && (
          <div className="post__user">
            <UserCard
              sign="@"
              userName={this.props.userName}
              accountName={this.props.accountName}
              profileLink={this.props.profileLink}
              avatarUrl={this.props.avatarUrl}
            />
          </div>
        )}
      </div>
    );
  }
}

PostFeedHeader.propTypes = {
  postTypeId: PropTypes.string,
  updatedAt: PropTypes.string,
  postId: PropTypes.number,
  userName: PropTypes.string,
  accountName: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  profileLink: PropTypes.string,
  avatarUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default PostFeedHeader;
