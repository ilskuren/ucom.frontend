import React from 'react';

const Avatar = props => (
  <div className="avatar">
    <img className="avatar__img" src={props.src} alt={props.alt} />
  </div>
);

export default Avatar;
