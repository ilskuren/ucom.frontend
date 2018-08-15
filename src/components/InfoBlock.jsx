import React from 'react';
import PropTypes from 'prop-types';

const InfoBlock = ({
  title, children,
}) => (
  <div className="info-block">
    <div className="info-block__title">{title}</div>
    { children }
  </div>
);

InfoBlock.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default InfoBlock;
