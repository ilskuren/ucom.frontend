import { createOrganization as createOrganizationApi } from '../api';
import { parseErrors } from '../utils/errors';

export const setUser = payload => ({ payload, type: 'SET_USER' });
export const removeUser = () => ({ type: 'REMOVE_USER' });

// General

export const changeUserField = payload => ({ type: 'CHANGE_USER_FIELD', payload });
export const validateProfileForm = payload => ({ type: 'VALIDATE_PROFILE_FORM', payload });
export const clearErrors = () => ({ type: 'CLEAR_PROFILE_FORM_ERRORS' });

// Contacts

export const addUserPersonalWebSite = () => ({ type: 'ADD_USER_PERSONAL_SITE' });
export const changeUserPersonalWebSiteUrl = payload => ({ type: 'CHANGE_USER_PERSONAL_SITE', payload });
export const removeUserPersonalWebSite = payload => ({ type: 'REMOVE_USER_PERSONAL_SITE', payload });

// Work and education

export const addUserEducationItem = () => ({ type: 'ADD_USER_EDUCATION_ITEM' });
export const changeUserEducationItem = payload => ({ type: 'CHANGE_USER_EDUCATION_ITEM', payload });
export const removeUserEducationItem = payload => ({ type: 'REMOVE_USER_EDUCATION_ITEM', payload });
export const addUserJobItem = () => ({ type: 'ADD_USER_JOB_ITEM' });
export const changeUserJobItem = payload => ({ type: 'CHANGE_USER_JOB_ITEM', payload });
export const removeUserJobItem = payload => ({ type: 'ADD_USER_REMOVE_ITEM', payload });

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
export const createOrganization = payload => (dispatch) => {
  createOrganizationApi(payload)
    .then(parseErrors)
    .then((data) => {
      dispatch(setOrganizationData(data));
      dispatch(setOrganizationSaved(true));
    })
    .catch((errors) => {
      dispatch(setOrganizationErrors(errors));
    });
};
