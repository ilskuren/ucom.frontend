import { combineReducers } from 'redux';
import { USER } from 'utils/actionTypes';

import { makeCommunicationReducer } from 'utils/redux/communication';

import { initial } from '../initial';

export const communicationReducer = combineReducers({
  editingGeneralInfo: makeCommunicationReducer(
    USER.EDIT_GENERAL_INFO,
    USER.EDIT_GENERAL_INFO_COMPLETED,
    USER.EDIT_GENERAL_INFO_FAIL,
    initial.communication.editingGeneralInfo,
  ),
  editingWorkAndEducation: makeCommunicationReducer(
    USER.EDIT_WORK_AND_EDUCATION,
    USER.EDIT_WORK_AND_EDUCATION_COMPLETED,
    USER.EDIT_WORK_AND_EDUCATION_FAIL,
    initial.communication.editingWorkAndEducation,
  ),
  editingContacts: makeCommunicationReducer(
    USER.EDIT_CONTACTS,
    USER.EDIT_CONTACTS_COMPLETED,
    USER.EDIT_CONTACTS_FAIL,
    initial.communication.editingContacts,
  ),
  uploadingAvatar: makeCommunicationReducer(
    USER.UPLOAD_AVATAR,
    USER.UPLOAD_AVATAR_COMPLETED,
    USER.UPLOAD_AVATAR_FAIL,
    initial.communication.uploadingAvatar,
  ),
});
