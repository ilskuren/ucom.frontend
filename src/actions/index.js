import { USER } from '../utils/actionTypes';
import { makeCommunicationActionCreators } from '../utils/redux/communication';

export const setUser = payload => ({ payload, type: USER.SET_USER });
export const removeUser = () => ({ type: USER.REMOVE_USER });

export const editUser = payload => ({ type: USER.EDIT_USER, payload });
export const editUserCompleted = payload => ({ type: USER.EDIT_USER_COMPLETED, payload });
export const editUserFail = payload => ({ type: USER.EDIT_USER_FAIL, payload });

export const { execute: editGeneralInfo, completed: editGeneralInfoCompleted, failed: editGeneralInfoFail } =
  makeCommunicationActionCreators(USER.EDIT_GENERAL_INFO, USER.EDIT_GENERAL_INFO_COMPLETED, USER.EDIT_CONTACTS_FAIL);

export const { execute: editWorkAndEducation, completed: editWorkAndEducationCompleted, failed: editWorkAndEducationFail } =
  makeCommunicationActionCreators(USER.EDIT_WORK_AND_EDUCATION, USER.EDIT_WORK_AND_EDUCATION_COMPLETED, USER.EDIT_WORK_AND_EDUCATION_FAIL);

export const { execute: editContacts, completed: editContactsCompleted, failed: editContactsFail } =
  makeCommunicationActionCreators(USER.EDIT_CONTACTS, USER.EDIT_CONTACTS_COMPLETED, USER.EDIT_CONTACTS_FAIL);

export const { execute: uploadUserAvatar, completed: uploadUserAvatarCompleted, failed: uploadUserAvatarFail } =
  makeCommunicationActionCreators(USER.UPLOAD_AVATAR, USER.UPLOAD_AVATAR_COMPLETED, USER.UPLOAD_AVATAR_FAIL);

// Validate forms

export const setPostData = payload => ({ type: 'SET_POST_DATA', payload });
export const resetPost = () => ({ type: 'RESET_POST' });
export const validatePost = () => ({ type: 'VALIDATE_POST' });
export const validatePostField = payload => ({ type: 'VALIDATE_POST_FIELD', payload });
