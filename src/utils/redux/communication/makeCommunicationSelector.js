export default function makeCommunicationSelector(selectState) {
  return (state, comm) => (
    selectState(state).communication[comm]
  );
}
