function makeCommunicationActionCreators(executeType, completeType, failType) {
  return {
    execute: payload => ({ type: executeType, payload }),
    completed: payload => ({ type: completeType, payload }),
    failed: (error, payload) => ({ type: failType, error, payload }),
  };
}

export default makeCommunicationActionCreators;
