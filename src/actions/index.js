import api from '../api';
import { parseErrors } from '../utils/errors';

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

// Contacts

export const addUserPersonalWebSite = () => ({ type: 'ADD_USER_PERSONAL_SITE' });
export const changeUserPersonalWebSiteUrl = payload => ({ type: 'CHANGE_USER_PERSONAL_SITE', payload });
export const removeUserPersonalWebSite = payload => ({ type: 'REMOVE_USER_PERSONAL_SITE', payload });
// Validate forms

export const setPostData = payload => ({ type: 'SET_POST_DATA', payload });
export const resetPost = () => ({ type: 'RESET_POST' });
export const validatePost = () => ({ type: 'VALIDATE_POST' });
export const validatePostField = payload => ({ type: 'VALIDATE_POST_FIELD', payload });

export const showAuthPopup = () => ({ type: 'SHOW_AUTH_POPUP' });
export const hideAuthPopup = () => ({ type: 'HIDE_AUTH_POPUP' });

export const setOrganizationActiveTab = payload => ({ type: 'SET_ORGANIZATION_ACTIVE_TAB', payload });
export const setOrganizationData = payload => ({ type: 'SET_ORGANIZATION_DATA', payload });
export const setOrganizationErrors = payload => ({ type: 'SET_ORGANIZATION_ERRORS', payload });
export const setOrganizationSaved = payload => ({ type: 'SET_ORGANIZATION_SAVED', payload });
export const saveOrganization = payload => (dispatch) => {
  const save = payload.id ? api.updateOrganization : api.createOrganization;

  save(payload)
    .then(parseErrors)
    .then((data) => {
      dispatch(setOrganizationData(data));
      dispatch(setOrganizationSaved(true));
    })
    .catch((errors) => {
      dispatch(setOrganizationErrors(errors));
    });
};
export const fetchOrganization = payload => (dispatch) => {
  api.getOrganization(payload)
    .then(parseErrors)
    .then((data) => {
      dispatch(setOrganizationData(data.data));
    });
};
export const resetOrganizationData = () => ({ type: 'RESET_ORGANIZATION' });
