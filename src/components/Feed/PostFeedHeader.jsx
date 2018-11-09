import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PostRating from '../Rating/PostRating';
import IconRepost from '../Icons/Repost';
import UserCard from '../UserCard';
import { getPostTypeById, POST_TYPE_REPOST_ID } from '../../utils/posts';

class PostFeedHeader extends PureComponent {
  render() {
    return (
      <div className="post__header">
        <div className="post__info-block">
          {this.props.postTypeId === POST_TYPE_REPOST_ID ? <IconRepost className="icon-repost" /> : null}
          <div className="post__type"><strong>{getPostTypeById(this.props.postTypeId)}</strong></div>
          <div className="toolbar__main">{this.props.updatedAt}</div>
          <div className="toolbar__side">
            <PostRating postId={this.props.postId} />
          </div>
        </div>

        {this.props.accountName && (
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
  postTypeId: PropTypes.number,
  updatedAt: PropTypes.string,
  postId: PropTypes.number,
  accountName: PropTypes.string,
  userName: PropTypes.string,
  profileLink: PropTypes.string,
  avatarUrl: PropTypes.string,
};

export default PostFeedHeader;
