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

  getGovernanceUrl() {
    return '/governance';
  },
};

export default urls;
