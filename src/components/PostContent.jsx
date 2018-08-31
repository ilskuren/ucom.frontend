import PropTypes from 'prop-types';
import React from 'react';
import Rating from './Rating';
import PostViews from './PostViews';

const PostContent = props => (
  <div className="posts">
    <div className="grid grid_post">
      <div className="grid__item">
        <div className="posts__content">
          {props.leadingText && (
            <div className="posts__lead-text posts__lead-text_offer">{props.leadingText}</div>
          )}
          {props.description && (
            <div className="posts__text" dangerouslySetInnerHTML={{ __html: props.description }} />
          )}
        </div>
      </div>
      <div className="grid__item">
        <div className="posts__sidebar">
          <div className="posts__rating">
            <Rating
              postId={props.postId}
              rating={props.rating}
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

PostContent.propTypes = {
  leadingText: PropTypes.string,
  description: PropTypes.string,
  postId: PropTypes.number,
  rating: PropTypes.number,
  сhoice: PropTypes.string,
};

export default PostContent;
