import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const InfoBlock = ({
  title, children, size, align,
}) => (
  <div className="info-block">
    <div
      className={classNames('info-block__title', {
        [`info-block__title_size_${size}`]: Boolean(size),
        [`info-block__title_align_${align}`]: Boolean(align),
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default InfoBlock;
