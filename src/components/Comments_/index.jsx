import React from 'react';
import styles from './styles.css';
import Comment from './Comment';
import ShowReplies from './ShowReplies';
import ShowNext from './ShowNext';
import Form from './Form';

const images = [{
  url: 'https://cdn-images-1.medium.com/max/1600/1*tLIXa6jWWjxfB-6AYjm2Hg.jpeg',
}, {
  url: 'https://cdn-images-1.medium.com/max/1600/0*qq6OeOaNR1Ct6vF7',
}, {
  url: 'https://cdn-images-1.medium.com/max/1600/1*tLIXa6jWWjxfB-6AYjm2Hg.jpeg',
}, {
  url: 'https://cdn-images-1.medium.com/max/1600/1*tLIXa6jWWjxfB-6AYjm2Hg.jpeg',
}, {
  url: 'https://cdn-images-1.medium.com/max/1600/0*qq6OeOaNR1Ct6vF7',
}, {
  url: 'https://cdn-images-1.medium.com/max/1600/1*tLIXa6jWWjxfB-6AYjm2Hg.jpeg',
}];

const Comments = () => (
  <div className={styles.comments}>
    <div className={styles.list}>
      <Comment images={images} />
      <Comment level={2} />
      <Form level={2} />
      <ShowReplies level={2} />
      <ShowNext />
    </div>
  </div>
);

export default Comments;
