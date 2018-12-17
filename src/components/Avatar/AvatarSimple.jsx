import React from 'react';
import UserIcon from '../Icons/User';

const AvatarSimple = props => (
  <div className="avatar-simple">
    {props.src ? (
      <img src={props.src} alt={props.alt} />
    ) : (
      <UserIcon />
    )}
  </div>
);

export default AvatarSimple;
