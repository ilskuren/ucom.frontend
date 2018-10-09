import NProgress from 'nprogress';

NProgress.configure({
  showSpinner: false,
});

let queue = 0;

export default {
  start() {
    queue++;

    NProgress.start();
  },

  done() {
    if (queue > 0) {
      queue--;
    }

    if (queue === 0) {
      NProgress.done();
    }
  },
};
