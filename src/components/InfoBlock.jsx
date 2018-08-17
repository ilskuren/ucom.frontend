import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const InfoBlock = ({
  title, children, size,
}) => (
  <div className="info-block">
    <div className={classNames('info-block__title', { [`info-block__title_size_${size}`]: Boolean(size) })}>
      {title}
    </div>
    { children }
  </div>
);

InfoBlock.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default InfoBlock;
