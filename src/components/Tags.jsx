import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const Tags = ({ tags }) => (
  <Fragment>
    {tags ? (
      <span className="tags">
        <span className="tags__item tags__item_icon">#</span>

        {tags.map(tag => (
          <span className="tags__item" key={tag}>{tag}</span>
        ))}
      </span>
    ) : (
      <span className="blank">Lorem ipsum dolor sit amet.</span>
    )}
  </Fragment>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Tags;
