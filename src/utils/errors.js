import { camelCase } from 'lodash';

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

export const parseErrors = (error) => {
  if (error.response && error.response.data && error.response.data.errors) {
    return error.response.data.errors.map(item => ({ ...item, field: camelCase(item.field) }));
  }

  const errors = {
    general: error.message,
  };

  return errors;
};
