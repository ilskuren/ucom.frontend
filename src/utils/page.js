let pageContentIsBlocked = false;
let pageContentBlockedQueue = 0;
let pageIsBlured = false;
let pageBluredQueue = 0;

export const blockPageContent = () => {
  const pageContent = document.querySelector('.page__content');

  if (!pageContent) {
    return;
  }

  pageContentBlockedQueue++;

  if (pageContentIsBlocked) {
    return;
  }

  pageContent.style.top = `-${window.pageYOffset}px`;
  pageContent.classList.add('page__content_blocked');
  window.scrollTo(0, 0);
  pageContentIsBlocked = true;
};

export const unblockPageContent = () => {
  const pageContent = document.querySelector('.page__content');

  if (!pageContent) {
    return;
  }

  if (pageContentBlockedQueue > 0) {
    pageContentBlockedQueue--;
  }

  if (!pageContentIsBlocked || pageContentBlockedQueue > 0) {
    return;
  }

  const topOffset = parseInt(pageContent.style.top, 10);

  pageContent.classList.remove('page__content_blocked');
  pageContent.style.top = '';
  window.scrollTo(0, Math.abs(topOffset));
  pageContentIsBlocked = false;
};

export const blurPage = () => {
  pageBluredQueue++;

  if (pageIsBlured) {
    return;
  }

  const page = document.querySelector('.page');

  page.classList.add('page_blur');
  pageIsBlured = true;
};

export const unblurPage = () => {
  if (pageBluredQueue > 0) {
    pageBluredQueue--;
  }

  if (!pageIsBlured || pageBluredQueue > 0) {
    return;
  }

  const page = document.querySelector('.page');

  page.classList.remove('page_blur');
  pageIsBlured = false;
};
