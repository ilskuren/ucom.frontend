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
