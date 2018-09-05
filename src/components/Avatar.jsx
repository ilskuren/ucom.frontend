import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Avatar = props => (
  <span
    className={classNames(
      'avatar',
      { 'avatar_rounded': props.rounded },
      { 'avatar_square': props.square },
      { [`avatar_${props.size}`]: Boolean(props.size) },
      { 'avatar_border_white': props.borderWhite },
      { 'avatar_blank': !props.src },
    )}
  >
    {props.src ? (
      <img className="avatar__img" src={props.src} alt={props.alt} />
    ) : (
      <span className="avatar__img avatar__img_blank" />
    )}
  </span>
);

Avatar.propTypes = {
  square: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  borderWhite: PropTypes.bool,
};

Avatar.defaultProps = {
  square: false,
  rounded: false,
};

export default Avatar;
