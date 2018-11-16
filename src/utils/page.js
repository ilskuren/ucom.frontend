let pageContentIsBlocked = false;
let pageContentBlockedQueue = 0;

export const blockPageContent = () => {
  pageContentBlockedQueue++;

  if (pageContentIsBlocked) {
    return;
  }

  const page = document.querySelector('.page');
  const pageContent = document.querySelector('.page__content');

  pageContent.style.top = `-${window.pageYOffset}px`;
  pageContent.classList.add('page__content_blocked');
  page.classList.add('page_blur');
  window.scrollTo(0, 0);
  pageContentIsBlocked = true;
};

export const unblockPageContent = () => {
  if (pageContentBlockedQueue > 0) {
    pageContentBlockedQueue--;
  }

  if (!pageContentIsBlocked || pageContentBlockedQueue > 0) {
    return;
  }

  const page = document.querySelector('.page');
  const pageContent = document.querySelector('.page__content');
  const topOffset = parseInt(pageContent.style.top, 10);

  pageContent.classList.remove('page__content_blocked');
  page.classList.remove('page_blur');
  pageContent.style.top = '';
  window.scrollTo(0, Math.abs(topOffset));
  pageContentIsBlocked = false;
};
