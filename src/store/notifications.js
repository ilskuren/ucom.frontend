export const NOTIFICATION_TYPE_ERROR = 1;

const getInitialState = () => ({
  list: [],
});

const notifications = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_NOTIFICATIONS': {
      return getInitialState();
    }

    case 'ADD_NOTIFICATION': {
      const notification = action.payload;
      const list = state.list.concat(notification);

      return Object.assign({}, state, { list });
    }

    default: {
      return state;
    }
  }
};

export default notifications;
