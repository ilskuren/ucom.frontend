import React from 'react';
import styles from './styles.css';
import Comment from './Comment/wrapper';
import ShowReplies from './ShowReplies';
import ShowNext from './ShowNext';
import Form from './Form/wrapper';

const Comments = () => (
  <div className={styles.comments}>
    <div className={styles.list}>
      <Comment
        userId={380}
        date="Today at 4:20 PM"
        text="Hey CryptoManiac! Im not sure why but the preview of your post on the main page shows no picture which is a shame since its a nice article."
      />
      <ShowReplies />
      <ShowNext />
      <Form postId={14006} />
    </div>
  </div>
);

export default Comments;
