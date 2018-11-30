import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import PostRating from '../../Rating/PostRating';
import IconRepost from '../../Icons/Repost';
import UserCard from '../../UserCard';
import { getPostTypeById, POST_TYPE_REPOST_ID } from '../../../utils/posts';
import urls from '../../../utils/urls';
import { getPostById } from '../../../store/posts';

const PostFeedHeader = (props) => {
  const post = getPostById(props.posts, props.postId);

  if (!post) {
    return null;
  }

  return (
    <div className="post__header">
      <div className="post__info-block">
        {props.postTypeId === POST_TYPE_REPOST_ID ? <IconRepost className="icon-repost" /> : null}
        <div className="post__type"><strong>{getPostTypeById(props.postTypeId)}</strong></div>
        <div className="toolbar__main">
          <Link to={urls.getFeedPostUrl(post)}>{props.createdAt}</Link>
        </div>
        <div className="toolbar__side">
          <PostRating postId={props.postId} />
        </div>
      </div>

      {props.accountName && (
        <div className="post__user">
          <UserCard
            sign="@"
            userName={props.userName}
            accountName={props.accountName}
            profileLink={props.profileLink}
            avatarUrl={props.avatarUrl}
          />
        </div>
      )}
    </div>
  );
};

PostFeedHeader.propTypes = {
  postTypeId: PropTypes.number,
  createdAt: PropTypes.string,
  postId: PropTypes.number,
  accountName: PropTypes.string,
  userName: PropTypes.string,
  profileLink: PropTypes.string,
  avatarUrl: PropTypes.string,
};

export default connect(state => ({
  posts: state.posts,
}))(PostFeedHeader);
