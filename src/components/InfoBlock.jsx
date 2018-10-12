import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const InfoBlock = ({
  title, children, size, align, line, scrolled,
}) => (
  <div className={`info-block ${scrolled && 'info-block_scrolled'}`}>
    <div
      className={classNames('info-block__title', {
        [`info-block__title_size_${size}`]: Boolean(size),
        [`info-block__title_align_${align}`]: Boolean(align),
        [`info-block__title_line_${line}`]: Boolean(line),
      })}
    >
      {title}
    </div>
    { children }
  </div>
);

InfoBlock.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string,
  align: PropTypes.string,
  line: PropTypes.string,
  scrolled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default InfoBlock;
