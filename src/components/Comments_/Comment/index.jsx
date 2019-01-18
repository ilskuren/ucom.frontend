import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';
import UserCard from '../../UserCard/UserCard';
import Gallery from '../../Gallery';

const Comment = props => (
  <div className={styles.comment} level={props.level}>
    <div className={styles.userCard}>
      <UserCard userId={props.userId} />
    </div>
    <div className={styles.content}>
      {props.images.length > 0 &&
        <div className={styles.gallery}>
          <Gallery
            images={props.images}
            userId={props.userId}
            date={props.date}
          />
        </div>
      }

      <div className={styles.text}>
        {props.text}
      </div>
      <div className={styles.actions}>
        <div className={styles.reply}>Reply</div>
        <div className={styles.date}>{props.date}</div>
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
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

Comment.defaultProps = {
  level: 1,
  images: [],
};

export default Comment;
