import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import React from 'react';
import Rate from '../Rate';
import Tags from '../Tags';
import UserCard from '../UserCard';
import IconCloud from '../Icons/Cloud';

const PostCardSmall = props => (
  <div
    className={classNames(
      'post-card post-card_small',
      { 'post-card_with-cover': props.coverUrl && props.coverUrl.length > 0 },
      { 'post-card_mini': props.onFeed || null },
    )}
  >

    {(props.coverUrl && props.coverUrl.length > 0) ? (
      <Link to={props.url} className="post-card__cover">
        <img className="post-card__img" src={props.coverUrl} alt="" />
      </Link>
    ) : (
      <Link to={props.url} className="post__cover_head">
        <div alt="cover" className="post__cover-media" />
        <IconCloud className="post__icon-cloud" />
      </Link>
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
        <h1 className="title">
          <Link to={props.url}>{props.title}</Link>
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

PostCardSmall.propTypes = {
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

export default PostCardSmall;
