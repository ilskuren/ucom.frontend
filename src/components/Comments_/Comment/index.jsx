import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';
import UserCard from '../../UserCard/UserCard';

const Comment = props => (
  <div className={styles.comment} level={props.level}>
    <div className={styles.userCard}>
      <UserCard userId={380} />
    </div>
    <div className={styles.content}>
      <div className={styles.text}>
        Hey CryptoManiac! Im not sure why but the preview of your post on the main page shows no picture which is a shame since its a nice article.
      </div>
      <div className={styles.actions}>
        <div className={styles.reply}>
          Reply
        </div>
        <div className={styles.date}>
          10 min ago
        </div>
      </div>
    </div>
  </div>
);

Comment.propTypes = {
  level: PropTypes.number,
};

Comment.defaultProps = {
  level: 1,
};

export default Comment;
