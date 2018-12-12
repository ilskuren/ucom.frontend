import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import PostRating from '../Rating/PostRating';
import EditIcon from '../Icons/Edit';
import Tags from '../Tags';
import Rate from '../Rate';
import Comments from '../Comments/Comments';
import UserCard from '../UserCard';
import { getPostEditUrl, getPostTypeById } from '../../utils/posts';
import { selectUser } from '../../store/selectors/user';
import { getPostById } from '../../store/posts';
import { getFileUrl } from '../../utils/upload';
import { escapeQuotes, sanitizePostText } from '../../utils/text';
import { getOrganizationUrl } from '../../utils/organization';

const PostContent = (props) => {
  const post = getPostById(props.posts, props.postId);
  const tags = [];

  if (!post) { return null; }

  tags.push(getPostTypeById(post.postTypeId));

  return (
    <div className="posts">
      <div className="grid grid_post">
        <div className="grid__item">
          {post.title ? (
            <div className="posts__header">
              <div className="toolbar toolbar_top toolbar_responsive-reverse">
                <div className="toolbar__main">
                  <div className="posts__tags">
                    <Tags tags={tags} />
                  </div>

                  <h1 className="title title_medium">
                    <div className="inline">
                      <div className="inline__item">
                        {escapeQuotes(post.title)}
                      </div>
                      {props.user.id === post.userId ? (
                        <div className="inline__item">
                          <Link to={getPostEditUrl(post.id)}>
                            <span className="post-item__edit">
                              <EditIcon />
                            </span>
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </h1>
                </div>
                <div className="toolbar__side">
                  <Rate
                    className="rate_medium"
                    value={post.currentRate}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {post.organization && (
            <div className="posts__organization">
              <UserCard
                squareAvatar
                roundedAvatar
                caption="ORG"
                userName={post.organization.title}
                accountName={post.organization.nickname}
                rate={post.organization.currentRate}
                avatarUrl={getFileUrl(post.organization.avatarFilename)}
                profileLink={getOrganizationUrl(post.organization.id)}
              />
            </div>
          )}

          <div className="posts__content">
            {post.mainImageFilename && (
              <div className="posts__poster">
                <img src={getFileUrl(post.mainImageFilename)} className="posts__poster-img" alt="" />
              </div>
            )}
            {post.leadingText && (
              <div className="posts__lead-text">{escapeQuotes(post.leadingText)}</div>
            )}
            {post.description && (
              <div className="post-content" dangerouslySetInnerHTML={{ __html: sanitizePostText(post.description) }} />
            )}
          </div>
          <div className="posts__comments">
            <Comments
              postId={post.id}
            />
          </div>
        </div>

        <div className="grid__item">
          <div className="posts__sidebar">
            <div className="posts__rating">
              <PostRating postId={post && post.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostContent.propTypes = {
  postId: PropTypes.number,
  posts: PropTypes.objectOf(PropTypes.object),
};

export default connect(state => ({
  user: selectUser(state),
  posts: state.posts,
  comments: state.comments,
}))(PostContent);
