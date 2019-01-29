import { uniq } from 'lodash';

const getInitialState = () => ({
  loading: false,
  postIds: [],
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

    case 'FEED_PREPEND_POST_IDS':
      return { ...state, postIds: uniq(action.payload.concat(state.postIds)) };

    case 'FEED_SET_METADATA':
      return { ...state, metadata: action.payload };

    case 'FEED_SET_LOADING':
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};
