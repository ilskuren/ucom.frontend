import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import React from 'react';
import Rate from '../Rate';
import Tags from '../Tags';
import UserCard from '../UserCard';

const PostCard = (props) => {
  const PostLink = props.url ? Link : 'span';

  return (
    <div
      className={classNames(
        'post-card',
        { 'post-card_with-cover': props.coverUrl && props.coverUrl.length > 0 },
      )}
    >
      {props.coverUrl && props.coverUrl.length > 0 && (
        <PostLink to={props.url} className="post-card__cover">
          <img className="post-card__img" src={props.coverUrl} alt="" />
        </PostLink>
      )}

      {props.rate !== undefined && (
        <div className="post-card__rate">
          <Rate value={+props.rate} />
        </div>
      )}

      {props.tags && (
        <div className="post-card__tags">
          <Tags tags={props.tags} />
        </div>
      )}

      {props.title && (
        <div className="post-card__title">
          <h1 className="title title_light">
            <PostLink to={props.url}>{props.title}</PostLink>
          </h1>
        </div>
      )}

      <div className="post-card__users">
        <div className="toolbar">
          <div className="toolbar__main">
            {props.userName && (
              <div className="inline">
                <div className="inline__item">
                  <UserCard
                    userName={props.userName}
                    accountName={props.accountName}
                    profileLink={props.userUrl}
                    avatarUrl={props.userImageUrl}
                    rate={1000}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="toolbar__side">
            <div className="inline">
              {props.sharesCount !== undefined && (
                <div className="inline__item">
                  <div className="post-card__shares">
                    <Rate value={props.sharesCount} dimension="" label="shares" />
                  </div>
                </div>
              )}
              {props.commentsCount !== undefined && (
                <div className="inline__item">
                  <div className="post-card__shares">
                    <Rate value={props.commentsCount} dimension="" label="Comments" />
                  </div>
                </div>
              )}
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

export default PostCard;
