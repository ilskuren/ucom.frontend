import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Rating from '../Rating';
import PostViews from '../PostViews';
import EditIcon from '../Icons/Edit';
import Tags from '../Tags';
import Rate from '../Rate';
import Comments from '../Comments/Comments';
import UserCard from '../UserCard';
import { getPostEditUrl, getPostTypeById } from '../../utils/posts';
import { selectUser } from '../../store/selectors/user';
import { getPostById } from '../../store/posts';
import { getFileUrl } from '../../utils/upload';
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
                        {post.title || <span className="blank">Lorem ipsum dolor sit amet.</span>}
                      </div>
                      <div className="inline__item">
                        {props.user.id === post.userId ? (
                          <Link to={getPostEditUrl(post.id)}>
                            <span className="post-item__edit">
                              <EditIcon />
                            </span>
                          </Link>
                        ) : null}
                      </div>
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
                rate={post.organization.current_rate}
                avatarUrl={getFileUrl(post.organization.avatar_filename)}
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
              <div className="posts__lead-text posts__lead-text_offer">{post.leadingText}</div>
            )}
            {post.description && (
              <div className="posts__text" dangerouslySetInnerHTML={{ __html: post.description }} />
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
              <Rating
                postId={post.id}
                rating={post.currentVote}
                choice={props.сhoice}
              />
            </div>
            <div className="posts__views">
              <PostViews views={0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PostContent.propTypes = {
//   id: PropTypes.number,
//   userId: PropTypes.number,
//   title: PropTypes.string,
//   leadingText: PropTypes.string,
//   description: PropTypes.string,
//   rate: PropTypes.number,
//   tags: PropTypes.arrayOf(PropTypes.string),
//   rating: PropTypes.number,
//   сhoice: PropTypes.string,
//   imgSrc: PropTypes.string,
//   comments: PropTypes.arrayOf(PropTypes.object),
//   onSubmitComment: PropTypes.func,
// };

export default connect(state => ({
  user: selectUser(state),
  posts: state.posts,
  comments: state.comments,
}))(PostContent);
