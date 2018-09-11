
export const addEmptyEducationItem = () => ({ type: 'PROFILE_WORK-AND-EDUCATION:ADD_EMPTY_EDUCATION_ITEM' });
export const changeEducationItem = payload => ({ type: 'PROFILE_WORK-AND-EDUCATION:CHANGE_EDUCATION_ITEM', payload });
export const removeEducationItem = payload => ({ type: 'PROFILE_WORK-AND-EDUCATION:REMOVE_EDUCATION_ITEM', payload });
export const addEmptyJobItem = () => ({ type: 'PROFILE_WORK-AND-EDUCATION:ADD_EMPTY_JOB_ITEM' });
export const changeJobItem = payload => ({ type: 'PROFILE_WORK-AND-EDUCATION:CHANGE_JOB_ITEM', payload });
export const removeJobItem = payload => ({ type: 'PROFILE_WORK-AND-EDUCATION:REMOVE_JOB_ITEM', payload });
export const validateWorkAndEducation = () => ({ type: 'PROFILE_WORK-AND-EDUCATION:VALIDATE_FORM' });
