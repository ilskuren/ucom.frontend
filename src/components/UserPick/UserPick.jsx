import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';
import UserIcon from '../Icons/User';
import styles from './styles.css';

const UserPick = (props) => {
  const LinkTag = props.url ? Link : 'div';

  return (
    <LinkTag className={styles.userPick} title={props.alt} to={props.url}>
      {props.src ? (
        <img src={props.src} alt={props.alt} />
      ) : (
        <UserIcon />
      )}
    </LinkTag>
  );
};

UserPick.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string,
};

UserPick.defaultProps = {
  url: null,
  alt: null,
  src: null,
};

export default UserPick;
