import React from 'react';
import styles from './styles.css';

const ShowReplies = () => (
  <div className={styles.showReplies}>
    <div className={styles.icon}>
      <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 0V7.21812H12M12 7.21812L8.5 4M12 7.21812L8.5 10.2062" stroke="#C4C4C4" />
      </svg>
    </div>
    <div className={styles.title}>
      Show 10 replies
    </div>
  </div>
);

export default ShowReplies;
