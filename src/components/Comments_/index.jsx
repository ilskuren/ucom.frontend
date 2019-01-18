import React from 'react';
import styles from './styles.css';
import Comment from './Comment';
import ShowReplies from './ShowReplies';
import ShowNext from './ShowNext';
import Form from './Form';

const images = [{
  url: 'https://cdn-images-1.medium.com/max/1600/1*tLIXa6jWWjxfB-6AYjm2Hg.jpeg',
}, {
  url: 'https://cdn-images-1.medium.com/fit/c/304/312/1*giLVJ2n0RBmSGY0bl9Ju4g.jpeg',
}, {
  url: 'https://cdn-images-1.medium.com/max/1600/0*qq6OeOaNR1Ct6vF7',
}, {
  url: 'https://cdn-images-1.medium.com/max/1600/1*Gpo6knTSfsz0E9qjtCmBEQ.jpeg',
}, {
  url: 'https://cdn-images-1.medium.com/max/2000/1*4xPpiZc_fPAbmZP7nu-Feg.jpeg',
}, {
  url: 'https://cdn-images-1.medium.com/max/2600/1*8HSjkuZT5pn-XbiDLWd1BA.jpeg',
}, {
  url: 'https://cdn-images-1.medium.com/max/2000/0*WzYWvtV9CbhkCorg.',
}, {
  url: 'https://cdn-images-1.medium.com/max/2600/1*_GgmGZJnFec994dvCDpbWQ.jpeg',
}, {
  url: 'https://cdn-images-1.medium.com/max/2600/1*ySqLBZN2SER8dgjXI4V1HA.jpeg',
}, {
  url: 'https://cdn-images-1.medium.com/max/1600/1*U4YtkYu5jY6qh715rwDv6Q.png',
}, {
  url: 'https://cdn-images-1.medium.com/max/2000/1*ouogUJ0xI5JvI6NxG9aASg.jpeg',
}, {
  url: 'https://cdn-images-1.medium.com/max/1600/1*-iObk8UXDIrRgT78sSPowA.jpeg',
}, {
  url: 'https://cdn-images-1.medium.com/max/2600/1*XK9MNYAYKoJ66fedSy0Rhw.jpeg',
}];

const Comments = () => (
  <div className={styles.comments}>
    <div className={styles.list}>
      <Comment
        userId={380}
        images={images}
        date="Today at 4:20 PM"
        text="Hey CryptoManiac! Im not sure why but the preview of your post on the main page shows no picture which is a shame since its a nice article."
      />
      <Form />
      <ShowReplies />
      <ShowNext />
    </div>
  </div>
);

export default Comments;
