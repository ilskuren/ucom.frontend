import { uniq } from 'lodash';

const getInitialState = () => ({
  loading: false,
  communityIds: [],
  manyUsers: [],
  metadata: {
    hasMore: false,
    page: 1,
  },
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case 'COMMUNITY_FEED_RESET':
      return getInitialState();

    case 'COMMUNITY_FEED_SET_IDS':
      return { ...state, communityIds: action.payload };

    case 'COMMUNITY_FEED_PREPEND_IDS':
      return { ...state, communityIds: uniq(action.payload.concat(state.communityIds)) };

    case 'COMMUNITY_FEED_APPEND_IDS':
      return { ...state, communityIds: uniq(state.communityIds.concat(action.payload)) };

    case 'COMMUNITY_FEED_SET_METADATA':
      return { ...state, metadata: action.payload };

    case 'COMMUNITY_FEED_SET_LOADING':
      return { ...state, loading: action.payload };

    case 'COMMUNITY_FEED_APPEND_USERS':
      return { ...state, manyUsers: uniq(state.manyUsers.concat(action.payload)) };

    default:
      return state;
  }
};
