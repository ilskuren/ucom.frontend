import { uniq } from 'lodash';

const getInitialState = () => ({
  loading: false,
  postIds: [],
  comments: {},
  metadata: {
    hasMore: false,
    page: 1,
  },
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case 'FEED_RESET':
      return getInitialState();

    case 'FEED_SET_POST_IDS':
      return { ...state, postIds: action.payload };

    case 'FEED_APPEND_POST_IDS':
      return { ...state, postIds: state.postIds.concat(action.payload) };

    case 'FEED_PREPEND_POST_IDS':
      return { ...state, postIds: action.payload.concat(state.postIds) };

    case 'FEED_SET_METADATA':
      return { ...state, metadata: action.payload };

    case 'FEED_SET_LOADING':
      return { ...state, loading: action.payload };

    case 'FEED_ADD_COMMENTS':
      return {
        ...state,
        comments: {
          ...state.comments,

          [action.payload.postId]: {
            ...state.comments[action.payload.postId],

            commentIds: uniq(state.comments[action.payload.postId]
              ? state.comments[action.payload.postId].commentIds.concat(action.payload.commentIds)
              : action.payload.commentIds),

            metadata: {
              ...(state.comments[action.payload.postId] ? state.comments[action.payload.postId].metadata : null),
              ...(action.payload.metadata ? { [action.payload.parentId]: action.payload.metadata } : null),
            },
          },
        },
      };

    default:
      return state;
  }
};
