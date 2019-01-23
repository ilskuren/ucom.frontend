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
      <div className={styles.comment} depth={props.depth} id={`comment-${props.id}`}>
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
            {props.depth < 2 &&
              <div
                role="presentation"
                className={styles.reply}
                onClick={() => setFormVisible(!formVisible)}
              >
                Reply
              </div>
            }
            <div className={styles.date}>{props.date}</div>
          </div>
        </div>
      </div>

      {formVisible &&
        <Form
          postId={props.postId}
          commentId={props.id}
          autoFocus
          depth={props.depth + 1}
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
  id: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
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
  images: [],
  ownerImageUrl: null,
  ownerPageUrl: null,
  ownerName: null,
};

export default Comment;
