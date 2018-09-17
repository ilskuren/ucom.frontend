export const setUser = payload => ({ type: 'SET_USER', payload });
export const setLoading = payload => ({ type: 'SET_LOADING', payload });
export const removeUser = () => ({ type: 'REMOVE_USER' });

export const editUser = payload => ({ type: 'USER:EDIT_USER', payload });
export const editUserCompleted = payload => ({ type: 'USER:EDIT_USER_COMPLETED', payload });
export const editUserFail = payload => ({ type: 'USER:SEDIT_USER_FAIL', payload });

export const editUserGeneralInfo = payload => ({ type: 'USER:EDIT_GENERAL_INFO', payload });
export const editUserGeneralInfoCompleted = payload => ({ type: 'USER:EDIT_GENERAL_INFO_COMPLETED', payload });
export const editUserGeneralInfoFail = payload => ({ type: 'USER:EDIT_GENERAL_INFO_FAIL', payload });

export const editUserWorkAndEducation = payload => ({ type: 'USER:EDIT_WORK_AND_EDUCATION', payload });
export const editUserWorkAndEducationCompleted = payload => ({ type: 'USER:EDIT_WORK_AND_EDUCATION_COMPLETED', payload });
export const editUserWorkAndEducationFail = payload => ({ type: 'USER:EDIT_WORK_AND_EDUCATION_FAIL', payload });

export const editUserContacts = payload => ({ type: 'USER:EDIT_CONTACTS', payload });
export const editUserContactsCompleted = payload => ({ type: 'USER:EDIT_CONTACTS_COMPLETED', payload });
export const editUserContactsFail = payload => ({ type: 'USER:EDIT_CONTACTS_FAIL', payload });

export const uploadUserAvatar = payload => ({ type: 'USER:UPLOAD_AVATAR', payload });
export const uploadUserAvatarCompleted = payload => ({ type: 'USER:UPLOAD_AVATAR_COMPLETED', payload });
export const uploadUserAvatarFail = payload => ({ type: 'USER:UPLOAD_AVATAR_FAIL', payload });

// Contacts

export const addUserPersonalWebSite = () => ({ type: 'ADD_USER_PERSONAL_SITE' });
export const changeUserPersonalWebSiteUrl = payload => ({ type: 'CHANGE_USER_PERSONAL_SITE', payload });
export const removeUserPersonalWebSite = payload => ({ type: 'REMOVE_USER_PERSONAL_SITE', payload });
// Validate forms

export const setPostData = payload => ({ type: 'SET_POST_DATA', payload });
export const resetPost = () => ({ type: 'RESET_POST' });
export const validatePost = () => ({ type: 'VALIDATE_POST' });
export const validatePostField = payload => ({ type: 'VALIDATE_POST_FIELD', payload });
