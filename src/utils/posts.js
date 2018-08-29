export const UPVOTE_STATUS = 'upvote';
export const DOWNVOTE_STATUS = 'downvote';

export const getPostUrl = (postId) => {
  if (postId) {
    return `/posts/${postId}`;
  }

  return null;
};

export const getPostEditUrl = (postId) => {
  if (postId) {
    return `/posts/edit/${postId}`;
  }

  return null;
};
