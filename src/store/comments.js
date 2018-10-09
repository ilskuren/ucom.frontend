const getInitialState = () => ({
  data: {},
});

const comments = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_COMMENTS': {
      return getInitialState();
    }

    case 'ADD_COMMENTS': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, action.payload
          .reduce((value, item) => ({ ...value, [item.id]: Object.assign({}, state.data[item.id], item) }), {})),
      });
    }

    case 'SET_COMMENT_VOTE': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          [action.payload.id]: Object.assign({}, state.data[action.payload.id], {
            currentVote: action.payload.currentVote,
            myselfData: Object.assign({}, state.data[action.payload.id].myselfData, {
              myselfVote: action.payload.myselfVote,
            }),
          }),
        }),
      });
    }

    default: {
      return state;
    }
  }
};

export const getCommentById = (comments, commentId) => comments.data[commentId];

export const getCommentsByEntryId = (comments, entryId) => (
  Object.entries(comments.data)
    .map(item => item[1])
    .filter(item => item.commentableId === entryId)
);

export default comments;
