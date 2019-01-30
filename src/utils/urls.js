import { POST_TYPE_MEDIA_ID, POSTS_CATREGORIES } from './posts';
import { getBackendConfig } from './config';

const urls = {
  getNewPostUrl() {
    return '/posts/new';
  },

  getRegistrationUrl() {
    return '/registration';
  },

  getUserUrl(userId) {
    if (!userId) {
      return null;
    }

    return `/user/${userId}`;
  },

  getUserEditProfileUrl() {
    return '/profile/';
  },

  getGovernanceUrl() {
    return '/governance';
  },

  getPostUrl(post) {
    if (!post || !post.id) {
      return null;
    }

    if (post.postTypeId === POST_TYPE_MEDIA_ID) {
      return `/posts/${post.id}`;
    }

    if (post.entityNameFor && post.entityNameFor.trim() === 'org') {
      return `/communities/${post.entityIdFor}/${post.id}`;
    }

    if (post.entityIdFor) {
      return `/user/${post.entityIdFor}/${post.id}`;
    }

    return null;
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

  getPostEditUrl(postId) {
    if (!postId) {
      return null;
    }

    return `/posts/${postId}/edit`;
  },

  getOrganizationUrl(id) {
    if (!id) {
      return null;
    }

    return `/communities/${id}`;
  },

  getPublicationsCategoryUrl(
    name = POSTS_CATREGORIES[0].name,
    page,
  ) {
    let url = `/publications/${name}`;

    if (page) {
      url = `${url}/page/${page}`;
    }

    return url;
  },

  getPublicationsUrl() {
    return '/publications';
  },

  getFileUrl(filename) {
    if (!filename) {
      return null;
    }

    return `${getBackendConfig().httpEndpoint}/upload/${filename}`;
  },

  getPagingLink(params) {
    return `/users?page=${params.page}&sortBy=${params.sortBy}&perPage=${params.perPage}&userName=${params.userName}`;
  },
};

export default urls;
