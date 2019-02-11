import {
  SOURCES_ID_FACEBOOK,
  SOURCES_ID_REDDIT,
  SOURCES_ID_MEDIUM,
  SOURCES_ID_TWITTER,
  SOURCES_ID_GITHUB,
  USERS_TEAM_STATUS_ID_PENDING,
  USERS_TEAM_STATUS_ID_CONFIRMED,
  USERS_TEAM_STATUS_ID_DECLINED,
} from '../store/organization';

export const getOrganizationUrl = (id) => {
  if (!id) {
    return null;
  }

  return `/communities/${id}`;
};

export const getOrganizationEditUrl = (id) => {
  if (!id) {
    return null;
  }

  return `/communities/${id}/edit`;
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

    case SOURCES_ID_GITHUB: {
      return 'Github';
    }
    default: {
      return null;
    }
  }
};

export const getUsersTeamStatusById = (id) => {
  switch (id) {
    case USERS_TEAM_STATUS_ID_PENDING: {
      return 'Pending';
    }

    case USERS_TEAM_STATUS_ID_CONFIRMED: {
      return 'Confirmed';
    }

    case USERS_TEAM_STATUS_ID_DECLINED: {
      return 'Declined';
    }

    default: {
      return null;
    }
  }
};
