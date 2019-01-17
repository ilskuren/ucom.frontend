import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';
import UserCard from '../../UserCard/UserCard';
import Gallery from '../../Gallery';

const Comment = props => (
  <div className={styles.comment} level={props.level}>
    <div className={styles.userCard}>
      <UserCard userId={380} />
    </div>
    <div className={styles.content}>
      {props.images.length > 0 &&
        <div className={styles.gallery}>
          <Gallery images={props.images} />
        </div>
      }

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
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
  })),
};

Comment.defaultProps = {
  level: 1,
  images: [],
};

export default Comment;
