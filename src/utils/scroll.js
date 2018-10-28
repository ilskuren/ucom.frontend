export const disableScroll = () => {
  document.documentElement.classList.add('no-scroll');
};

export const enableScroll = () => {
  document.documentElement.classList.remove('no-scroll');
};

export const scrollTo = (el, topOffset = 0) => {
  if (!el) {
    return;
  }

  // setTimeout, так как в Page.jsx мы всегда скролим вверх при изменении урла
  setTimeout(() => {
    const header = document.getElementById('top');
    const headerOffset = header ? header.offsetHeight : 0;

    el.scrollIntoView();
    window.scrollBy(0, -headerOffset - topOffset);
  }, 1);
};
