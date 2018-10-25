export const disableScroll = () => {
  document.documentElement.classList.add('no-scroll');
};

export const enableScroll = () => {
  document.documentElement.classList.remove('no-scroll');
};
