export const getPostUrl = (postId) => {
  if (postId) {
    return `/posts/${postId}`;
  }

  return null;
};
