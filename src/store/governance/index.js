import { combineReducers } from 'redux';
import nodes from './nodes';

export const getSelectedNodes = state =>
  state.governance.nodes.data
    .filter(item => item.myselfData && item.myselfData.bpVote);

export default combineReducers({
  nodes,
});
