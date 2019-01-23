const getInitialState = () => ({
  loading: false,
  metadata: {
    hasMore: false,
    page: 1,
  },
  postIds: [],
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

    default:
      return state;
  }
};
