import api from '../api';
import loader from '../utils/loader';
import { selectUser } from '../store/selectors/user';
import { getSelectedNodes } from '../store/governance';

export const governanceNodesReset = payload => ({ type: 'GOVERNANCE_NODES_RESET', payload });
export const governanceNodesSetData = payload => ({ type: 'GOVERNANCE_NODES_SET_DATA', payload });
export const governanceNodesSetVote = payload => ({ type: 'GOVERNANCE_NODES_SET_VOTE', payload });
export const governanceShowVotePopup = () => ({ type: 'GOVERNANCE_NODES_SET_POPUP_VISIBILE', payload: true });
export const governanceHideVotePopup = () => ({ type: 'GOVERNANCE_NODES_SET_POPUP_VISIBILE', payload: false });
export const governanceNodesSetLoading = payload => ({ type: 'GOVERNANCE_NODES_SET_LOADING', payload });

export const governanceNodesGet = () => async (dispatch) => {
  loader.start();
  dispatch(governanceNodesSetLoading(true));

  try {
    const data = await api.getNodes();
    dispatch(governanceNodesSetData(data.data));
  } catch (e) {
    console.error(e);
  }

  loader.done();
  dispatch(governanceNodesSetLoading(false));
};

export const voteForBlockProducers = () => async (dispatch, getState) => {
  const state = getState();
  const user = selectUser(state);

  if (!user.accountName) {
    return;
  }

  const selectedNodes = getSelectedNodes(state);
  const selectedNodesAccountNames = selectedNodes.map(i => i.title);

  loader.start();
  dispatch(governanceNodesSetLoading(true));

  try {
    await api.voteForBlockProducers(user.accountName, selectedNodesAccountNames);
    dispatch(governanceHideVotePopup());
  } catch (e) {
    console.error(e);
  }

  loader.done();
  dispatch(governanceNodesSetLoading(false));
};
