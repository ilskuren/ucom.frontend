import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';
import styles from './styles.css';
import UserCard from '../../UserCard/UserCard';
import Gallery from '../../Gallery';
import Form from '../Form';

const Comment = (props) => {
  const [formVisible, setFormVisible] = useState(false);

  return (
    <Fragment>
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
            <div
              role="presentation"
              className={styles.reply}
              onClick={() => setFormVisible(!formVisible)}
            >
              Reply
            </div>
            <div className={styles.date}>{props.date}</div>
          </div>
        </div>
      </div>

      {formVisible &&
        <Form
          level={props.level + 1}
          userImageUrl={props.ownerImageUrl}
          userPageUrl={props.ownerPageUrl}
          userName={props.ownerName}
          onSubmit={props.onSubmit}
          onReset={() => setFormVisible(false)}
        />
      }
    </Fragment>
  );
};

Comment.propTypes = {
  level: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
  })),
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  ownerImageUrl: PropTypes.string,
  ownerPageUrl: PropTypes.string,
  ownerName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

Comment.defaultProps = {
  level: 1,
  images: [],
  ownerImageUrl: null,
  ownerPageUrl: null,
  ownerName: null,
};

export default Comment;
