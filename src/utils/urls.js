import { POST_TYPE_MEDIA_ID } from './posts';

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

  getPostUrl(post) {
    if (!post || !post.id || !post.entityIdFor || !post.entityNameFor) {
      return null;
    }

    if (post.postTypeId === POST_TYPE_MEDIA_ID) {
      return `/posts/${post.id}`;
    }

    if (post.entityNameFor.trim() === 'org') {
      return `/communities/${post.entityIdFor}/${post.id}`;
    }

    return `/user/${post.entityIdFor}/${post.id}`;
  },

  getFeedPostUrl(post) {
    if (!post || !post.id || !post.entityIdFor || !post.entityNameFor) {
      return null;
    }

    if (post.entityNameFor.trim() === 'org') {
      return `/communities/${post.entityIdFor}/${post.id}`;
    }

    return `/user/${post.entityIdFor}/${post.id}`;
  },

  getOrganizationUrl(id) {
    if (!id) {
      return null;
    }

    return `/communities/${id}`;
  },

  getPublicationsCategoryUrl(name) {
    return `/publications/${name}`;
  },

  getPublicationsUrl() {
    return '/publications';
  },
};

export default urls;
