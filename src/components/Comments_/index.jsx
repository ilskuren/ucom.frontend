import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';
import Comment from './Comment';
import Form from './Form';

const Comments = props => (
  <div className={styles.comments}>
    <div className={styles.list}>
      {props.comments.map(comment => (
        <Comment
          key={comment.id}
          text={comment.text}
          date={comment.date}
          userId={comment.userId}
          ownerImageUrl={props.ownerImageUrl}
          ownerPageUrl={props.ownerPageUrl}
          ownerName={props.ownerName}
          onSubmit={props.onSubmit}
        />
      ))}

      <Form
        postId={props.postId}
        userImageUrl={props.ownerImageUrl}
        userPageUrl={props.ownerPageUrl}
        userName={props.ownerName}
        onSubmit={props.onSubmit}
      />
    </div>
  </div>
);

Comments.propTypes = {
  postId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  })),
  ownerImageUrl: PropTypes.string,
  ownerPageUrl: PropTypes.string,
  ownerName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

Comments.defaultProps = {
  comments: [],
  ownerImageUrl: null,
  ownerPageUrl: null,
  ownerName: null,
};

export default Comments;
