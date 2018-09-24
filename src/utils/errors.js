export const getError = (errors, fieldName) => {
  if (!errors) {
    return null;
  }

  const fieldError = errors.find(error => error.field === fieldName);

  if (!fieldError) {
    return null;
  }

  return fieldError.message;
};

export const parseErrors = data => (
  Promise.resolve()
    .then(() => {
      if (!data || data.errors) {
        throw data.errors;
      }

      return data;
    })
);
