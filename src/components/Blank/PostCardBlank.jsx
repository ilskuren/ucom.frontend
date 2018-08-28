import React from 'react';
import RateBlank from './RateBlank';
import AvatarBlank from './AvatarBlank';

const PostCardBlank = () => (
  <div className="post-card">
    <div className="post-card__inner">
      <div className="post-card__cover post-card__cover_blank" />

      <div className="post-card__side">
        <div className="post-card__rate">
          <RateBlank />
        </div>
      </div>

      <div className="post-card__main">
        <div className="post-card__tags">
          <span className="tags">
            <span className="tags__item tags__item_icon">#</span>
            <span className="tags__item">
              <span className="blank">Lorem.</span>
            </span>
          </span>
        </div>

        <div className="post-card__title">
          <h1 className="title title_light">
            <span className="blank">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, perferendis.</span>
          </h1>
        </div>
      </div>

      <div className="post-card__footer">
        <div className="post-card__authors">
          <div className="avatars-list">
            <div className="avatars-list__item">
              <AvatarBlank />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PostCardBlank;
