import { makeCommunicationSelector } from '../../../utils/redux/communication';

export const selectCommunication = makeCommunicationSelector(state => state.user);
