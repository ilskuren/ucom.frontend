import { Link } from 'react-router-dom';
import React from 'react';
import UserIcon from './Icons/User';

const UserPick = (props) => {
  const LinkTag = props.url ? Link : 'div';

  return (
    <LinkTag className="user-pick" title={props.alt} to={props.url}>
      {props.src ? (
        <img src={props.src} alt={props.alt} />
      ) : (
        <UserIcon />
      )}
    </LinkTag>
  );
};

export default UserPick;
