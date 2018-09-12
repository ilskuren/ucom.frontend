import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import Rate from './Rate';
import Tags from './Tags';
import UserCard from './UserCard';

const PostCard = (props) => {
  const PostLinkTag = props.url ? Link : 'span';

  return (
    <div className="post-card">
      <div className="post-card__inner">
        <div
          className={classNames(
            'post-card__cover',
            { 'post-card__cover_blank': !props.coverUrl },
          )}
        >
          {props.coverUrl && (
            <img
              className="post-card__img"
              src={props.coverUrl}
              alt="cover"
            />
          )}
        </div>

        <div className="post-card__side">
          <div className="post-card__rate">
            <Rate value={props.rate} />
          </div>
        </div>

        <div className="post-card__main">
          <div className="post-card__tags">
            <Tags tags={props.tags} />
          </div>

          <div className="post-card__title">
            <h1 className="title title_light">
              <PostLinkTag to={props.url}>
                {props.title ? (
                  <Fragment>{props.title}</Fragment>
                ) : (
                  <span className="blank">Lorem ipsum dolor sit amet.</span>
                )}
              </PostLinkTag>
            </h1>
          </div>
        </div>

        <div className="post-card__footer">
          <div className="post-card__authors">
            <UserCard
              userName={props.userName}
              accountName={props.accountName}
              profileLink={props.userUrl}
              avatarUrl={props.userImageUrl}
            />
          </div>

          <div className="post-card__users">
            <div className="inline">
              <div className="inline__item">
                <div className="rate">
                  <div className="rate__value">{props.commentsCount}</div>
                  <div className="rate__label">Comments</div>
                </div>
              </div>
              {/* <div className="inline__item">
                <div className="rate">
                  <div className="rate__value">8 923</div>
                  <div className="rate__label">Joined</div>
                </div>
              </div> */}
              {/* <div className="inline__item post-card__joined">
                <div className="avatars-list avatars-list_shifted">
                  <div className="avatars-list__item">
                    <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
                  </div>
                  <div className="avatars-list__item">
                    <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
                  </div>
                  <div className="avatars-list__item">
                    <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
                  </div>
                </div>
              </div> */}
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
};

PostCard.defaultProps = {
  commentsCount: 0,
};

export default PostCard;
