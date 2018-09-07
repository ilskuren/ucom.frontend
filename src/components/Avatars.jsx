import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Avatar from './Avatar';
import { getFileUrl } from '../utils/upload';

const renderAvatar = (avatarData, number, orderStacking, size) => {
  const {
    square,
    avatar_filename,
    alt,
    borderWhite,
  } = avatarData;

  return (
    <span
      className="avatars__avatar"
      style={{ zIndex: orderStacking === 'fifo' ? number : '' }}
      key={number}
    >
      <Avatar square={square} src={getFileUrl(avatar_filename)} size={size} alt={alt} borderWhite={borderWhite} />
    </span>
  );
};

const Avatars = ({ list, orderStacking, maxAvatarsAmount = 5, size }) => {
  const listHead = list.slice(0, maxAvatarsAmount);
  const count = list.length - maxAvatarsAmount;
  return (
    <div className={cn('avatars', {[`avatars_${size}`]: Boolean(size) })}>
      <div className="avatars__list">
        {listHead.map((avatarData, avatarNumber, arr) => renderAvatar(avatarData, arr.length - avatarNumber, orderStacking, size))}
      </div>
      {count > 0 && (
        <div className="avatars__more">
          +{count}
        </div>
      )}
    </div>
  );
};

Avatars.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    square: PropTypes.bool,
    avatar_filename: PropTypes.string.isRequired,
    alt: PropTypes.string,
    borderWhite: PropTypes.bool,
  })).isRequired,
  orderStacking: PropTypes.oneOf(['fifo', 'lifo']).isRequired,
  size: PropTypes.string,
  maxAvatarsAmount: PropTypes.number,
};

Avatars.defaultProps = {
  maxAvatarsAmount: 5,
};

export default Avatars;
