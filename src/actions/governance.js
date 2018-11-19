import api from '../api';
import loader from '../utils/loader';

export const governanceNodesReset = payload => ({ type: 'GOVERNANCE_NODES_RESET', payload });
export const governanceNodesSetData = payload => ({ type: 'GOVERNANCE_NODES_SET_DATA', payload });
export const governanceNodesSetMetadata = payload => ({ type: 'GOVERNANCE_NODES_SET_METADATA', payload });
export const governanceNodesSetVote = payload => ({ type: 'GOVERNANCE_NODES_SET_VOTE', payload });

export const governanceNodesGet = () => async (dispatch) => {
  loader.start();

  try {
    const data = await api.getNodes();
    dispatch(governanceNodesSetData(data.data));
    dispatch(governanceNodesSetMetadata(data.metadata));
  } catch (e) {
    console.error(e);
  }

  loader.done();
};
