export const getOrganizationUrl = (id) => {
  if (!id) {
    return null;
  }

  return `/organizations/${id}`;
};
