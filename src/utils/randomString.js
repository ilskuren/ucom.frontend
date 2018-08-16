export const randomString = (length) => {
  const dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';

  for (let i = 0; i < length; i++) {
    str += dict.charAt(Math.floor(Math.random() * dict.length));
  }

  return str;
};
