import PropTypes from 'prop-types';
import React from 'react';

const Tags = ({ tags }) => (
  <span className="tags">
    <span className="tags__item tags__item_icon">#</span>

    {tags.map(tag => (
      <span className="tags__item" key={tag}>{tag}</span>
    ))}
  </span>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Tags;
