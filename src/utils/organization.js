import {
  SOURCES_ID_FACEBOOK,
  SOURCES_ID_REDDIT,
  SOURCES_ID_MEDIUM,
  SOURCES_ID_TWITTER,
} from '../store/organization';

export const getOrganizationUrl = (id) => {
  if (!id) {
    return null;
  }

  return `/organizations/${id}`;
};

export const getOrganizationEditUrl = (id) => {
  if (!id) {
    return null;
  }

  return `/organizations/${id}/edit`;
};

export const getSourceNameById = (id) => {
  switch (id) {
    case SOURCES_ID_FACEBOOK: {
      return 'Facebook';
    }

    case SOURCES_ID_REDDIT: {
      return 'Reddit';
    }

    case SOURCES_ID_MEDIUM: {
      return 'Medium';
    }

    case SOURCES_ID_TWITTER: {
      return 'Twitter';
    }

    default: {
      return null;
    }
  }
};
