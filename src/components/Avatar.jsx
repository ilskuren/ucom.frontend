import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Avatar = props => (
  <div
    className={classNames(
      'avatar',
      { avatar_square: props.square },
      { [props.size ? `avatar_${props.size}` : '']: true },
    )}
  >
    <img className="avatar__img" src={props.src} alt={props.alt} />
  </div>
);

Avatar.propTypes = {
  square: PropTypes.bool,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  square: false,
};

export default Avatar;
