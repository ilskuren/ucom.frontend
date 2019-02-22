import { uniq } from 'lodash';

const getInitialState = () => ({
  loading: false,
  postIds: [],
  metadata: {
    hasMore: false,
    page: 1,
  },
  manyUsers: [],
  manyOrganizations: [],
  manyTags: [],
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case 'FEED_RESET':
      return getInitialState();

    case 'FEED_SET_POST_IDS':
      return { ...state, postIds: action.payload };

    case 'FEED_PREPEND_POST_IDS':
      return { ...state, postIds: uniq(action.payload.concat(state.postIds)) };

    case 'FEED_APPEND_POST_IDS':
      return { ...state, postIds: uniq(state.postIds.concat(action.payload)) };

    case 'FEED_SET_METADATA':
      return { ...state, metadata: action.payload };

    case 'FEED_SET_LOADING':
      return { ...state, loading: action.payload };

    case 'FEED_SET_SIDE_USERS':
      return { ...state, manyUsers: uniq(state.manyUsers.concat(action.payload)) };

    case 'FEED_SET_SIDE_POSTS':
      return { ...state, manyUsers: uniq(state.manyUsers.concat(action.payload)) };

    case 'FEED_SET_SIDE_ORGANIZATIONS':
      return { ...state, manyOrganizations: uniq(state.manyOrganizations.concat(action.payload)) };

    case 'FEED_SET_SIDE_TAGS':
      return { ...state, manyTags: uniq(state.manyTags.concat(action.payload)) };

    default:
      return state;
  }
};
