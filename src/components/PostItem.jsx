import React from 'react';
import PropTypes from 'prop-types';

const PostItem = props => (
  <div className="post-item">
    {props.coverImg && (
      <div className="post-item__cover">
        <img className="post-item__img" src={props.coverImg} alt="" />
      </div>
    )}
    <div className="post-item__main">
      <div className="post-item__tags">
        <span className="tags">
          <span className="tags__item tags__item_icon">#</span>
          <span className="tags__item">Poll</span>
        </span>
      </div>

      <div className="post-item__text">
        This No-Brand Startup Won $240 Million to Fight Amazon on Price and Quality
      </div>
    </div>
    <div className="post-item__side">
      <div className="post-item__rate">
        <div className="rate">
          <div className="rate__value">9 200 <span className="rate__degree">°</span></div>
          <div className="rate__label">Rate</div>
        </div>
      </div>
    </div>
  </div>
);

PostItem.propTypes = {
  coverImg: PropTypes.string.isRequired,
};

export default PostItem;
