export const makeReducer = (name, getInitialState = () => ({})) =>
  (state = getInitialState(), action) => {
    switch (action.type) {
      case `${name}__RESET`:
        return getInitialState();

      case `${name}__SET`:
        return { ...state, ...action.payload };

      default:
        return state;
    }
  };
