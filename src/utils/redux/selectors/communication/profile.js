import { makeCommunicationSelector } from 'utils/redux/communication';
import { selectProfile } from 'utils/redux/selectors';

export const selectCommunication = makeCommunicationSelector(selectProfile);
