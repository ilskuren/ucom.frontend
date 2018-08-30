import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const renderAvatar = (avatarData, number, orderStacking) => {
  const {
    square,
    size,
    src,
    alt,
    borderWhite,
  } = avatarData;

  return (
    <span
      className="avatars__avatar"
      style={{ zIndex: orderStacking === 'fifo' ? number : '' }}
      key={number}
    >
      <Avatar square={square} src={src} size={size} alt={alt} borderWhite={borderWhite} />
    </span>
  );
};

const Avatars = ({ list, orderStacking }) => (
  <div className="avatars">
    {list.map((avatarData, avatarNumber, arr) => renderAvatar(avatarData, arr.length - avatarNumber, orderStacking))}
  </div>
);

Avatars.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    square: PropTypes.bool,
    size: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    borderWhite: PropTypes.bool,
  })),
  orderStacking: PropTypes.oneOf(['fifo', 'lifo']).isRequired,
};

export default Avatars;
