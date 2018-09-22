export const saveBrainkey = (token) => {
  localStorage.setItem('brainkey', token);
};

export const getBrainkey = () => (
  localStorage.getItem('brainkey')
);

export const removeBrainkey = () => (
  localStorage.removeItem('brainkey')
);
