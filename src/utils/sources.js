import urls from './urls';
import { getOrganizationUrl } from './organization';

export const getSourceUrl = (source) => {
  if (!source) {
    return null;
  }

  if (source.sourceUrl) {
    return source.sourceUrl;
  }

  if (source.entityName.trim() === 'users') {
    return urls.getUserUrl(source.entityId);
  }

  return getOrganizationUrl(source.entityId);
};
