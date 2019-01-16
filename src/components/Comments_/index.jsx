import React from 'react';
import styles from './styles.css';
import Comment from './Comment';
import ShowReplies from './ShowReplies';
import ShowNext from './ShowNext';
import Form from './Form';

const Comments = () => (
  <div className={styles.comments}>
    <div className={styles.list}>
      <Comment />
      <Comment level="2" />
      <Form level="2" />
      <ShowReplies level="2" />
      <ShowNext />
    </div>
  </div>
);

export default Comments;
