import { getUserUrl } from './user';
import { getOrganizationUrl } from './organization';

export const getSourceUrl = (source) => {
  if (!source) {
    return null;
  }

  if (source.sourceUrl) {
    return source.sourceUrl;
  }

  if (source.entityName.trim() === 'users') {
    return getUserUrl(source.entityId);
  }

  return getOrganizationUrl(source.entityId);
};
