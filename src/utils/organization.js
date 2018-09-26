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
