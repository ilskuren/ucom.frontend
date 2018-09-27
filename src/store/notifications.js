const getInitialState = () => ({
  notifications: [],
});

const notifications = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_NOTIFICATIONS': {
      return getInitialState();
    }

    case 'ADD_NOTIFICATIONS': {
      const notification = action.payload;
      const notifications = state.notifications.concat(notification);

      return Object.assign({}, state, { notifications });
    }

    default: {
      return state;
    }
  }
};

export default notifications;
