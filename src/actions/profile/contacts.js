export const changeEmailValue = payload => ({ type: 'PROFILE_CONTACTS:CHANGE_EMAIL_VALUE', payload });
export const changePhoneValue = payload => ({ type: 'PROFILE_CONTACTS:CHANGE_PHONE_VALUE', payload });
export const changeSiteValue = payload => ({ type: 'PROFILE_CONTACTS:CHANGE_SITE_VALUE', payload });
export const addSite = () => ({ type: 'PROFILE_CONTACTS:ADD_SITE' });
export const removeSite = payload => ({ type: 'PROFILE_CONTACTS:REMOVE_SITE', payload });
export const validateContacts = () => ({ type: 'PROFILE_CONTACTS:VALIDATE_FORM' });
