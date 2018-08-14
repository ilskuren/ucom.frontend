import React from 'react';
import classNames from 'classnames';

const Avatar = props => (
  <div
    className={classNames(
      'avatar',
      { avatar_square: props.square },
    )}
  >
    <img className="avatar__img" src={props.src} alt={props.alt} />
  </div>
);

export default Avatar;
