import React from 'react';
import PropTypes from 'prop-types';

const PostViews = ({ views }) => (
  <div className="post-views">
    <div className="post-views__eye" />
    <div className="post-views__views">{views} Views</div>
  </div>
);

PostViews.propTypes = {
  views: PropTypes.number,
};

PostViews.defaultProps = {
  views: 0,
};

export default PostViews;
