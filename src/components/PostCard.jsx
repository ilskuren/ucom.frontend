import { Link } from 'react-router-dom';
import React from 'react';
import Avatar from './Avatar';
import { getFileUrl } from '../utils/upload';
import { getUserLink } from '../utils/user';
import Rate from './Rate';

const PostCard = (props) => {
  const user = props.post.User;

  return (
    <div className="post-card">
      <div className="post-card__inner">
        <div className="post-card__cover">
          <img className="post-card__img" src={getFileUrl(props.post.main_image_filename)} alt="" />
        </div>

        <div className="post-card__side">
          <div className="post-card__rate">
            <Rate value={props.post.current_rate} />
          </div>
        </div>

        <div className="post-card__main">
          <div className="post-card__tags">
            <span className="tags">
              <span className="tags__item tags__item_icon">#</span>
              <span className="tags__item">story</span>
            </span>
          </div>

          <div className="post-card__title">
            <h1 className="title title_light">
              <Link to={`/posts/${props.post.id}`}>{props.post.title}</Link>
            </h1>
          </div>
        </div>

        <div className="post-card__footer">
          <div className="post-card__authors">
            <div className="avatars-list">
              {user && (
                <div className="avatars-list__item">
                  <Link to={getUserLink(user.id)}>
                    <Avatar square src={getFileUrl(user.avatar_filename)} />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* <div className="post-card__users">
            <div className="inline">
              <div className="inline__item">
                <div className="rate">
                  <div className="rate__value">354</div>
                  <div className="rate__label">Comments</div>
                </div>
              </div>
              <div className="inline__item">
                <div className="rate">
                  <div className="rate__value">8 923</div>
                  <div className="rate__label">Joined</div>
                </div>
              </div>
              <div className="inline__item post-card__joined">
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
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
