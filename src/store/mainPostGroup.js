const getInitialState = () => ({
  posts: [],
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case 'MAIN_POST_GROUP_RESET':
      return getInitialState();

    case 'MAIN_POST_GROUP_ADD_POSTS':
      return { ...state, posts: state.posts.concat(action.payload) };

    default:
      return state;
  }
};
