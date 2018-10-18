import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const InfoBlock = ({
  title, children, size, align, line, fixedChildren, fixedTitle,
}) => (
  <div className={`info-block ${fixedChildren && 'info-block_fixed-children'}`}>
    <div
      className={classNames('info-block__title', {
        [`info-block__title_size_${size}`]: Boolean(size),
        [`info-block__title_align_${align}`]: Boolean(align),
        [`info-block__title_line_${line}`]: Boolean(line),
        'info-block__title_fixed': fixedTitle,
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
  fixedChildren: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default InfoBlock;
