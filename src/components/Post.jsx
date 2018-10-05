import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import React from 'react';
import PostRating from './Rating/PostRating';
import UserCard from './UserCard';
import { getPostUrl, getPostTypeById } from '../utils/posts';
import { getFileUrl } from '../utils/upload';
import { getUserName, getUserUrl } from '../utils/user';

const Post = (props) => {
  const post = Object.entries(props.posts.data)
    .map(item => item[1])
    .find(item => item.id === props.id);

  if (!post) {
    return null;
  }

  const user = Object.entries(props.users.data)
    .map(item => item[1])
    .find(item => item.id === post.userId);

  return (
    <div className="post">
      <div className="post__type">{getPostTypeById(post.postTypeId)}</div>

      <div className="post__header">
        <div className="toolbar">
          <div className="toolbar__main">{moment(post.updatedAt).fromNow()}</div>

          <div className="toolbar__side">
            <PostRating postId={post.id} />
          </div>
        </div>
      </div>

      {user && (
        <div className="post__user">
          <UserCard
            sign="@"
            userName={getUserName(user)}
            accountName={user.accountName}
            profileLink={getUserUrl(user.id)}
            avatarUrl={getFileUrl(user.avatarFilename)}
          />
        </div>
      )}

      <div className="post__content">
        <h1 className="post__title">
          <Link to={getPostUrl(post.id)}>{post.title}</Link>
        </h1>

        {post.leadingText && (
          <h2 className="post__title post__title_leading">{post.leadingText}</h2>
        )}

        {post.mainImageFilename && (
          <div className="post__cover">
            <Link to={getPostUrl(post.id)}>
              <img src={getFileUrl(post.mainImageFilename)} alt="cover" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(state => ({
  posts: state.posts,
  users: state.users,
}))(Post);
