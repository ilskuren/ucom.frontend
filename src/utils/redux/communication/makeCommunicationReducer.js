export default function makeCommunicationReducer(
  executeType,
  completedType,
  failedType,
  initial,
) {
  return (state = initial, action) => {
    switch (action.type) {
      case executeType:
        return { error: "", isRequesting: true };
      case completedType:
        return { error: "", isRequesting: false };
      case failedType:
        return { error: action.error, isRequesting: false };
      default:
        return state;
    }
  };
}
