import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Avatar = props => (
  <div
    className={classNames(
      'avatar',
      { avatar_square: props.square },
      { [`avatar_${props.size}`]: Boolean(props.size) },
    )}
  >
    <img className="avatar__img" src={props.src} alt={props.alt} />
  </div>
);

Avatar.propTypes = {
  square: PropTypes.bool,
  size: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  square: false,
};

export default Avatar;
