// import { uniqueId } from 'lodash';

const getInitialState = () => ({
  list: {},
  tooltipVisibilty: false,
});

const siteNotifications = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_NOTIFICATIONS_TOOLTIP': {
      return getInitialState();
    }

    case 'HIDE_NOTIFICATIONS_TOOLTIP': {
      return {
        ...state, tooltipVisibilty: false,
      };
    }

    case 'SHOW_NOTIFICATIONS_TOOLTIP': {
      return {
        ...state, tooltipVisibilty: false,
      };
    }

    case 'TRIGGER_NOTIFICATIONS_TOOLTIP': {
      return {
        ...state, tooltipVisibilty: !state.tooltipVisibilty,
      };
    }

    default: {
      return state;
    }
  }
};

export default siteNotifications;
