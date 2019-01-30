export const COMMENTS_CONTAINER_ID_FEED_POST = 1;
export const COMMENTS_CONTAINER_ID_POST = 2;
export const COMMENTS_PER_PAGE = 10;
export const COMMENTS_INITIAL_COUNT_USER_WALL_FEED = 3;

export const sortCommentsFn = (commentA, commentB) => { // eslint-disable-line
  const a = commentA.path;
  const b = commentB.path;

  const iterationAmount = a.length > b.length ? a.length : b.length;

  for (let i = 0; i < iterationAmount; i++) {
    if (b[i] === undefined) return 1;
    if (a[i] === undefined) return -1;
    if (a[i] !== b[i]) return a[i] - b[i];
  }
};

export const sortComments = (comments) => {
  if (!comments || !comments.length) {
    return [];
  }

  return comments.sort(sortCommentsFn);
};

export const getCommentsTree = (comments = []) => {
  const makeReplyesLevel = (comment) => {
    if (comment.nextDepthTotalAmount > 0 || comments.some(i => i.parentId === comment.id)) {
      comment.replys = comments
        .filter(i => i.parentId === comment.id)
        .sort(sortCommentsFn)
        .map(makeReplyesLevel);
    }

    return comment;
  };

  const commentsTree = comments
    .filter(i => i.parentId === 0)
    .sort(sortCommentsFn)
    .map(makeReplyesLevel);

  return commentsTree;
};
