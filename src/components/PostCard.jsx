import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';
import Rate from './Rate';
import Tags from './Tags';
import UserCard from './UserCard';

const PostCard = (props) => {
  const PostLink = props.url ? Link : 'span';

  return (
    <div className="post-card">
      <PostLink to={props.url} className="post-card__cover">
        <img className="post-card__img" src={props.coverUrl} alt="cover" />
      </PostLink>

      <div className="post-card__rate">
        <Rate value={props.rate} />
      </div>

      <div className="post-card__tags">
        <Tags tags={props.tags} />
      </div>

      <div className="post-card__title">
        <h1 className="title title_light">
          <PostLink to={props.url}>{props.title}</PostLink>
        </h1>
      </div>

      <div className="post-card__users">
        <div className="toolbar">
          <div className="toolbar__main">
            <UserCard
              userName={props.userName}
              accountName={props.accountName}
              profileLink={props.userUrl}
              avatarUrl={props.userImageUrl}
            />
          </div>

          <div className="toolbar__side">
            <div className="inline">
              <div className="inline__item">
                <div className="post-card__shares">
                  <Rate value={props.sharesCount} dimension="" label="shares" />
                </div>
              </div>
              <div className="inline__item">
                <div className="post-card__shares">
                  <Rate value={props.commentsCount} dimension="" label="Comments" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  url: PropTypes.string,
  userUrl: PropTypes.string,
  coverUrl: PropTypes.string,
  rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  userImageUrl: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  userName: PropTypes.string,
  accountName: PropTypes.string,
  commentsCount: PropTypes.number,
  sharesCount: PropTypes.number,
};

PostCard.defaultProps = {
  commentsCount: 0,
  sharesCount: 0,
};

export default PostCard;
