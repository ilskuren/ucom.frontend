import dict from './dict';

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

export const validatePost = (fields = {}) => {
  const errors = [];

  if (!fields.title || fields.title.length === 0) {
    errors.push({
      field: 'title',
      message: dict.titleIsRequired,
    });
  }

  if (!fields.leading_text || fields.leading_text.length === 0) {
    errors.push({
      field: 'leading_text',
      message: dict.leadingTextIsRequired,
    });
  }

  if (!fields.description || fields.description.length === 0) {
    errors.push({
      field: 'description',
      message: dict.descriptionIsRequired,
    });
  }

  return errors;
};
