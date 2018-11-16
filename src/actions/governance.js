import api from '../api';
import loader from '../utils/loader';

export const governanceNodesReset = payload => ({ type: 'GOVERNANCE_NODES_RESET', payload });
export const governanceNodesSetData = payload => ({ type: 'GOVERNANCE_NODES_SET_DATA', payload });

export const governanceNodesGet = () => async () => {
  loader.start();

  try {
    const data = await api.getNodes();
    console.log(data);
  } catch (e) {
    console.error(e);
  }

  loader.done();
};
