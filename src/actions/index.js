export const setUser = data => ({ data, type: 'SET_USER' });
export const removeUser = () => ({ type: 'REMOVE_USER' });
export const setPostData = data => ({ type: 'SET_POST_DATA', data });
export const resetPost = () => ({ type: 'RESET_POST' });
export const validatePost = () => ({ type: 'VALIDATE_POST' });
export const validatePostField = data => ({ type: 'VALIDATE_POST_FIELD', data });
