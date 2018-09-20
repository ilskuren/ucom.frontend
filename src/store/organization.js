const getInitialState = () => ({
  data: {},
  errors: {},
  isValid: false,
  steps: [{
    id: 1,
    name: 'General info',
    active: true,
  }, {
    id: 2,
    name: 'Community',
    active: false,
  }, {
    id: 3,
    name: 'Contacts',
    active: false,
  }],
});

const organization = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_ORGANIZATION': {
      return getInitialState();
    }

    case 'SET_ORGANIZATION_DATA': {
      const data = Object.assign({}, state.data, action.payload);

      return Object.assign({}, state, { data });
    }

    case 'SET_ORGANIZATION_ACTIVE_TAB': {
      const steps = state.steps.map(i => Object.assign({}, i, { active: i.id === action.payload }));

      return Object.assign({}, state.data, { steps });
    }

    default: {
      return state;
    }
  }
};

export default organization;
