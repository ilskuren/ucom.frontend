import { initialCommunicationField } from '../../utils/redux/communication';

export const initial = {
  communication: {
    editingGeneralInfo: initialCommunicationField,
    editingWorkAndEducation: initialCommunicationField,
    editingContacts: initialCommunicationField,
    uploadingAvatar: initialCommunicationField,
  },
};
