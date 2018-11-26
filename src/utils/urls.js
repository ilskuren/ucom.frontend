const urls = {
  getRegistrationUrl() {
    return '/registration';
  },

  getUserUrl(userId) {
    if (!userId) {
      return null;
    }

    return `/user/${userId}`;
  },
};

export default urls;
