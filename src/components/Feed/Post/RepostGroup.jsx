import React from 'react';
import styles from './styles.css';
import Avatar from '../../Avatar';

const RepostGroup = props => (
  <div className={styles.showMore}>Also reposted by
    <Avatar size="xxxsmall" src={props.avatarUrl} />
    75 people
  </div>
);

export default RepostGroup;
