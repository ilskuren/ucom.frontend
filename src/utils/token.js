export const saveToken = (token) => {
  try {
    localStorage.setItem('token', token);
  } catch (e) {
    console.error(e);
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch (e) {
    return null;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem('token');
  } catch (e) {
    console.error(e);
  }
};
